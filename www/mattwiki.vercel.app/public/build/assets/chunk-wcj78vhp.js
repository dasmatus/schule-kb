import{e as m}from"./chunk-9ermmxn8.js";import"./chunk-pq64hr3e.js";import{h as d}from"./chunk-8st7626e.js";import{i as u,j as p,m as g}from"./chunk-nbgrde22.js";import{Y as c,aa as e,ba as a}from"./chunk-ntqfqdmn.js";function f({categories:n}){let{data:l,setData:o,post:b,processing:s,errors:r}=c({title:"",slug:"",content:"",category_id:"",tags:"",status:"draft"});function v(t){t.preventDefault(),b("/articles")}function h(t){return t.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}return a(u,{children:[e(d,{}),a("main",{className:"mx-auto max-w-screen-xl px-4 py-10 animate-fade-in",children:[a("div",{className:"mb-8 flex items-center gap-3",children:[e(p,{icon:g,className:"size-6 text-indigo-400"}),e("h1",{className:"text-3xl font-bold text-white",children:"New article"})]}),a("form",{onSubmit:v,className:"grid grid-cols-1 gap-6 lg:grid-cols-3",children:[e("div",{className:"lg:col-span-2 space-y-5",children:a("div",{className:"glass rounded-2xl p-6 space-y-5",children:[e(i,{label:"Title",error:r.title,children:e("input",{type:"text",value:l.title,onChange:(t)=>{o("title",t.target.value),o("slug",h(t.target.value))},className:"input-glass",placeholder:"Article title"})}),e(i,{label:"Slug",error:r.slug,children:e("input",{type:"text",value:l.slug,onChange:(t)=>o("slug",t.target.value),className:"input-glass",placeholder:"article-slug"})}),e(i,{label:"Content (Markdown)",error:r.content,children:e("textarea",{value:l.content,onChange:(t)=>o("content",t.target.value),rows:20,className:"input-glass font-mono text-sm resize-y min-h-80",placeholder:`# Heading

Write your article in Markdown…`})})]})}),e("div",{className:"space-y-5",children:a("div",{className:"glass rounded-2xl p-5 space-y-4",children:[e("h3",{className:"font-semibold text-white",children:"Publish"}),e(i,{label:"Status",error:r.status,children:a("select",{value:l.status,onChange:(t)=>o("status",t.target.value),className:"input-glass",children:[e("option",{value:"draft",children:"Draft"}),e("option",{value:"review",children:"In review"}),e("option",{value:"published",children:"Published"})]})}),e(i,{label:"Category",error:r.category_id,children:a("select",{value:l.category_id,onChange:(t)=>o("category_id",t.target.value),className:"input-glass",children:[e("option",{value:"",children:"Select category…"}),n.map((t)=>e("option",{value:t.name,children:t.name},t.name))]})}),e(i,{label:"Tags (comma separated)",error:r.tags,children:e("input",{type:"text",value:l.tags,onChange:(t)=>o("tags",t.target.value),className:"input-glass",placeholder:"math, algebra, vectors"})}),e(m,{type:"submit",disabled:s,className:"w-full",children:s?"Publishing…":"Publish article"})]})})]})]}),e("style",{children:`
        .input-glass {
          width: 100%;
          border-radius: 12px;
          padding: 0.5rem 0.875rem;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          color: white;
          font-size: 0.875rem;
          backdrop-filter: blur(8px);
          outline: none;
          transition: border-color 150ms;
        }
        .input-glass::placeholder { color: rgba(255,255,255,0.3); }
        .input-glass:focus { border-color: rgba(99,102,241,0.5); }
        .input-glass option { background: #1e1b4b; color: white; }
      `})]})}function i({label:n,error:l,children:o}){return a("div",{children:[e("label",{className:"block mb-2 text-sm font-medium text-white/70",children:n}),o,l&&e("p",{className:"mt-1.5 text-xs text-rose-400",children:l})]})}export{f as default};
