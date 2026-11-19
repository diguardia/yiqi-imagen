"""Fase 1: estilos escritos a mano del catalogo -> clases .cat-* en ds-doc.css.
Solo convierte un elemento si TODAS sus declaraciones tienen clase; el resto queda para la fase 2.
Uso: python3 convertir.py <salida.css> <pagina.html> [<pagina.html> ...] [--dry]"""
import re,sys,collections
argv=[a for a in sys.argv[1:] if not a.startswith('--')]; dry='--dry' in sys.argv
cssp,paginas=argv[0],argv[1:]
AB={'color':'c','background':'bg','background-color':'bg','margin':'m','margin-top':'mt','margin-bottom':'mb','margin-left':'ml','margin-right':'mr',
 'padding':'p','padding-top':'pt','padding-bottom':'pb','padding-left':'pl','padding-right':'pr','max-width':'maxw','min-width':'minw','width':'w',
 'height':'h','min-height':'minh','max-height':'maxh','display':'d','text-align':'ta','gap':'gap','row-gap':'rgap','column-gap':'cgap','align-items':'ai',
 'align-self':'as','justify-content':'jc','flex-direction':'fd','flex-wrap':'fwr','flex':'flex','flex-shrink':'fsh','flex-grow':'fgr','font-size':'fs',
 'font-weight':'fwt','font-family':'ff','line-height':'lh','white-space':'ws','letter-spacing':'ls','text-transform':'tt','border-radius':'r',
 'fill':'fill','stroke':'stroke','position':'pos','overflow':'ov','vertical-align':'va','text-decoration':'td','cursor':'cur','opacity':'op',
 'font':'f','font-style':'fst','font-variant-numeric':'fvn','grid-template-columns':'gtc','place-items':'pli','text-wrap':'twr','word-break':'wb',
 'list-style':'lst','border':'bd','pointer-events':'pe','inset':'inset','background-size':'bgs','background-image':'bgi','box-shadow':'sh',
 'transform':'tf','transform-origin':'tfo','border-collapse':'bcol','overflow-x':'ovx','overflow-y':'ovy','mask-image':'mask','-webkit-mask-image':'wmask',
 'transition':'tr','animation':'anim','animation-play-state':'aps','outline-offset':'olo','border-top':'bt','border-bottom':'bb','border-left':'bl',
 '--demo-line':'vdemoline','--anim':'vanim','isolation':'iso','--accent':'vaccent','--accent-ink':'vaccentink',
 'stroke-width':'sw','justify-items':'jitems','justify-self':'jself','grid-auto-flow':'gaf','grid-column':'gcol','columns':'cols','stroke-linecap':'slc','stroke-linejoin':'slj','border-color':'bdc','backdrop-filter':'bdf','outline':'ol','z-index':'z','top':'top','right':'right','bottom':'bottom','left':'left','overflow-wrap':'owr','text-overflow':'tov','box-sizing':'bxs'}
VAR=r'var\(--[a-z0-9-]+\)'
SIMPLE=re.compile(r'^(?:'+VAR+r'|-?[0-9.]+(?:px|%|ch|em|rem|vw|vh|fr)?|[a-z-]+|#[0-9a-fA-F]{3,6})(?:[ /]+(?:'+VAR+r'|-?[0-9.]+(?:px|%|ch|em|rem|fr)?|[a-z-]+|\'[A-Za-z ]+\'))*$')
def slug(v):
    v=re.sub(r'var\(--([a-z0-9-]+)\)',r'\1',v)
    toks=[]
    for t in re.split(r'[ /]+',v.replace("'","")):
        neg=t.startswith('-') and len(t)>1 and (t[1].isdigit() or t[1]=='.')
        if neg: t=t[1:]
        t=re.sub(r'px$','',t).replace('%','pct').replace('.','p').replace('#','hex')
        toks.append(('n' if neg else '')+t)
    return re.sub(r'-+','-','-'.join(toks)).strip('-')
RADIO={'2px':'var(--radius-hairline)','6px':'var(--radius-detail)','8px':'var(--radius-item)','9px':'var(--radius-item)','999px':'var(--radius-control)'}
import hashlib
def clase(prop,val):
    """Devuelve (clase, valor final) o None."""
    if prop not in AB: return None
    if prop=='border-radius':
        val=RADIO.get(val,val)   # radios a mano -> rol
        if not re.fullmatch(r'var\(--radius(?:-[a-z0-9-]+)?\)|50%|0',val): return None
    sl=slug(val)
    if not SIMPLE.match(val) or len(sl)>34 or re.search(r'[^a-zA-Z0-9-]',sl):
        sl=re.sub(r'[^a-z0-9-]','',re.sub(r'[ ,()/]+','-',val.lower()))[:18].strip('-')+'-'+hashlib.md5(val.encode()).hexdigest()[:5]
    return ('cat-'+AB[prop]+'-'+sl, val)
nuevas={}; conv=0; quedan=0; pend=collections.Counter()
norm=lambda v:';'.join(sorted(' '.join(x.split()) for x in v.split(';') if x.strip()))
SEM={norm('background:var(--cyan-soft);border-radius:var(--radius-pill);color:var(--cyan);display:inline-block;font:600 10px var(--mono);margin-left:6px;padding:2px 7px;white-space:nowrap'):['cat-pill-clase'],
 norm('color:var(--muted);font:400 13px/1.6 var(--sans);margin:-4px 0 14px;max-width:64ch'):['cat-lead'],
 norm('color:var(--muted);font:400 13px/1.6 var(--sans);margin:-4px 0 14px;max-width:66ch'):['cat-lead'],
 norm('color:var(--muted);font:400 13px/1.6 var(--sans);margin:-4px 0 18px;max-width:62ch'):['cat-lead','cat-mb-18'],
}
SEMCSS='''/* Clases con nombre: patrones que se repetian escritos a mano. */
.cat-pill-clase:not(#cat):not(#cat) { display: inline-block; margin-left: 6px; padding: 2px 7px; border-radius: var(--radius-pill); background: var(--cyan-soft); color: var(--cyan); font: 600 10px var(--mono); white-space: nowrap; }
.cat-lead:not(#cat):not(#cat) { max-width: 64ch; margin: -4px 0 14px; font: 400 13px/1.6 var(--sans); color: var(--muted); }
'''

def procesar(s):
    global conv,quedan
    out=[]; last=0
    h=re.sub(r'<(pre|code|script|style|textarea)\b[\s\S]*?</\1>',lambda m:re.sub(r'[^\n]','\0',m.group(0)),s,flags=re.I)
    reTag=re.compile(r'<([a-zA-Z][a-zA-Z0-9-]*)\b([^>]*?)\sstyle="([^"]*)"([^>]*)>')
    for m in reTag.finditer(h):
        decls=[(d.split(':',1)[0].strip().lower(),' '.join(d.split(':',1)[1].split())) for d in m.group(3).split(';') if ':' in d]
        cls=[]; ok=True
        if norm(m.group(3)) in SEM:
            cls=list(SEM[norm(m.group(3))]); decls=[]
            for c in cls:
                if c=='cat-mb-18': nuevas[c]=('margin-bottom','18px')
        for p,v in decls:
            c=clase(p,v)
            if not c: ok=False; pend[(p,v)]+=1; continue
            cls.append(c[0]); nuevas[c[0]]=(p,c[1])
        if not ok or not cls: quedan+=1; continue
        conv+=1
        a,b=m.start(),m.end()
        pre,post=s[a:m.start(3)-8],s[m.end(3)+1:b]   # quita ' style="..."'
        tag=s[a:b]
        t2=re.sub(r'\sstyle="[^"]*"','',tag,count=1)
        cm=re.search(r'\sclass="([^"]*)"',t2)
        if cm: t2=t2[:cm.start(1)]+(cm.group(1)+' '+' '.join(dict.fromkeys(cls))).strip()+t2[cm.end(1):]
        else: t2=t2[:len(m.group(1))+1]+' class="'+' '.join(dict.fromkeys(cls))+'"'+t2[len(m.group(1))+1:]
        out.append(s[last:a]); out.append(t2); last=b
    out.append(s[last:]); r=''.join(out)

    return r
resultados={}
for pg in paginas:
    resultados[pg]=procesar(open(pg,encoding='utf-8').read())
print('convertidos',conv,'quedan',quedan,'clases',len(nuevas)); print('props que frenan:',pend.most_common(15))
if not dry:
    for pg,r in resultados.items(): open(pg,'w',encoding='utf-8').write(r)
    bloque=['/* ══════════════════════════════════════════════════════════════════════',
     '   cat-clases.css · clases de las demos del catalogo y del showcase (generado)',
     '   19/11/2026. Lo que el catalogo y el showcase escribian con style="" pasa a',
     '   clases: una sola fuente y ningun estilo escrito a mano en el HTML',
     '   (scripts/check-catalogo.js lo vigila).',
     '   Son de acomodo de la demo (espacios, grilla, color de un texto de ejemplo),',
     '   nunca el aspecto de un componente: eso es la clase real del DS.',
     '   :not(#cat):not(#cat) les da la fuerza que tenia el style="": le gana a',
     '   las reglas de cada pagina, incluso las que empiezan con una id',
     '   (#tab-movil .nv), sin !important.',
     '   Nombre: cat-<propiedad>-<valor>. No se edita a mano: se regenera con',
     '   scripts/canon/convertir.py.',
     '   ══════════════════════════════════════════════════════════════════════ */',
     SEMCSS]
    for c,(p,v) in sorted(nuevas.items()):
        bloque.append('.%s:not(#cat):not(#cat) { %s: %s; }'%(c,p,v))
    open(cssp,'w',encoding='utf-8').write('\n'.join(bloque)+'\n')
