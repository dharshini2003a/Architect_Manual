#!/usr/bin/env python3
"""
Builds  search-index.js  (the text the website search looks into).

Run this again whenever you change the text / add videos, checklists or PDFs:
    python build_search_index.py
Keep it in the same folder as script.js and the chapter .html files.
(Optional tool - the website itself does not need this file.)

What goes into the index
  * every section of every chapter (heading + all text)
  * every video / PDF / Excel / PPT / Word file / image found in a section
    (its heading, its file name, and which section it is in)
"""
import json, re, os
from html.parser import HTMLParser
from urllib.parse import unquote

HERE = os.path.dirname(os.path.abspath(__file__))
JS = os.path.join(HERE, 'script.js')
OUT = os.path.join(HERE, 'search-index.js')

KIND = {'mp4': 'Video', 'mov': 'Video', 'webm': 'Video', 'm4v': 'Video',
        'pdf': 'PDF', 'xlsx': 'Excel', 'xls': 'Excel', 'csv': 'Excel',
        'pptx': 'PPT', 'ppt': 'PPT', 'docx': 'Word', 'doc': 'Word',
        'jpg': 'Image', 'jpeg': 'Image', 'png': 'Image', 'gif': 'Image', 'webp': 'Image', 'svg': 'Image'}
KIND_WORDS = {'Video': 'video', 'PDF': 'pdf', 'Excel': 'excel spreadsheet', 'PPT': 'powerpoint presentation',
              'Word': 'word document', 'Image': 'image figure illustration'}
ORDER = ['Video', 'PDF', 'Excel', 'PPT', 'Word', 'Image']

def clean(t):
    return re.sub(r'\s+', ' ', t or '').strip()

def chapters_from_js(src):
    return [{'id': m.group(1), 'label': m.group(2), 'href': m.group(3)}
            for m in re.finditer(r"\{\s*id:\s*'([\w]+)',\s*label:\s*'([^']*)',\s*href:\s*'([^']*)'", src)]

def nice_name(base):
    b = re.sub(r'_for HTML', '', base, flags=re.I).replace('_', ' ')
    return clean(b)

class Blocks(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.blocks = []; self.cur = None; self.depth = 0
        self.skip = 0; self.in_title = False
        self.lab = None; self.lab_buf = ''; self.parent = ''; self.item = ''
    # ---- helpers
    def add_res(self, path, alt=''):
        path = unquote((path or '').strip())
        if not path or path.startswith(('http', '#', 'mailto', 'javascript')): return
        base = path.replace('\\', '/').split('/')[-1]
        if '.' not in base: return
        name, ext = base.rsplit('.', 1)
        kind = KIND.get(ext.lower())
        if not kind: return
        if kind == 'Image' and not ('/' in path.replace('\\', '/')): return   # ignore tiny local icons
        key = name.lower()
        r = self.cur['res'].get(key)
        title = self.item or self.parent or (alt and clean(alt)) or nice_name(name)
        if r is None:
            self.cur['res'][key] = {'name': name, 'kinds': {kind}, 'title': title, 'parent': self.parent}
        else:
            r['kinds'].add(kind)
    # ---- parser events
    def handle_starttag(self, tag, attrs):
        a = dict(attrs); cls = a.get('class') or ''
        if self.cur is None:
            if tag == 'div' and 'content-block' in cls.split() and (a.get('id') or '').startswith('content-'):
                self.cur = {'id': a['id'], 'title': '', 'text': [], 'res': {}}
                self.depth = 1; self.parent = ''; self.item = ''; self.lab = None
            return
        if tag == 'div': self.depth += 1
        if tag in ('script', 'style'): self.skip += 1
        if tag in ('h1', 'h2') and 'article-title' in cls.split(): self.in_title = True
        elif self.lab is None:
            if tag in ('h2', 'h3', 'h4', 'h5', 'h6'): self.lab = (tag, 'parent'); self.lab_buf = ''
            elif tag in ('strong', 'b') or (tag == 'p' and 'font-weight' in (a.get('style') or '')):
                self.lab = (tag, 'item'); self.lab_buf = ''
        if tag == 'img':
            if a.get('alt'): self.cur['text'].append(a['alt'])
            self.add_res(a.get('src'), a.get('alt', ''))
        if tag in ('video', 'source', 'audio'): self.add_res(a.get('src'))
        if tag == 'a' and a.get('href'): self.add_res(a['href'])
        if tag == 'button' and a.get('onclick'):
            for m in re.finditer(r"""(?:openFileViewer|downloadFile)\(\s*['"]([^'"]+)['"]""", a['onclick']):
                self.add_res(m.group(1))
    def handle_endtag(self, tag):
        if self.cur is None: return
        if tag in ('script', 'style'): self.skip = max(0, self.skip - 1)
        if tag in ('h1', 'h2') and self.in_title: self.in_title = False
        if self.lab and self.lab[0] == tag:
            text = clean(self.lab_buf)
            if text and len(text) <= 170:
                if self.lab[1] == 'parent': self.parent = text; self.item = ''
                else: self.item = text
            self.lab = None
        if tag == 'div':
            self.depth -= 1
            if self.depth == 0:
                self.cur['title'] = clean(self.cur['title'])
                self.cur['text'] = clean(' '.join(self.cur['text']))
                self.blocks.append(self.cur); self.cur = None
    def handle_data(self, data):
        if self.cur is None or self.skip: return
        if self.in_title: self.cur['title'] += ' ' + data; return
        self.cur['text'].append(data)
        if self.lab: self.lab_buf += data

def main():
    src = open(JS, encoding='utf-8', newline='').read()
    index = []
    n_res = 0
    for ch in chapters_from_js(src):
        path = os.path.join(HERE, ch['href'])
        if not os.path.exists(path):
            print('  (skipped, file not found)', ch['href']); continue
        p = Blocks(); p.feed(open(path, encoding='utf-8').read())
        res_count = 0
        for b in p.blocks:
            sec_title = b['title'] or ch['label']
            index.append({'c': ch['label'], 'h': ch['href'], 's': b['id'], 't': sec_title, 'x': b['text']})
            for r in b['res'].values():
                kinds = [k for k in ORDER if k in r['kinds']]
                words = ' '.join(KIND_WORDS[k] for k in kinds)
                index.append({'c': ch['label'], 'h': ch['href'], 's': b['id'],
                              't': r['title'], 'p': sec_title,
                              'x': clean('%s %s %s' % (r['parent'], r['name'], words)),
                              'k': ' · '.join(kinds), 'f': r['name']})
                res_count += 1
        n_res += res_count
        print('  %-14s %2d sections, %2d files/videos' % (ch['href'], len(p.blocks), res_count))
    js = ('/* auto-generated by build_search_index.py - do not edit by hand */\n'
          'window.SEARCH_INDEX = ' + json.dumps(index, ensure_ascii=False, separators=(',', ':')) + ';\n')
    open(OUT, 'w', encoding='utf-8', newline='\n').write(js)
    print('Done: %d entries (%d videos/files), search-index.js = %d KB' % (len(index), n_res, os.path.getsize(OUT) // 1024))

if __name__ == '__main__':
    main()