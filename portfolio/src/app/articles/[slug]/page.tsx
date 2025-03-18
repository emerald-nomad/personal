import { Container } from "@/components/Container";
import { client } from "@/sanity/client"
import { formatDate } from "@/lib/formatDate";
import { Article } from "@/types";
import { ArticleBackButton } from "@/components/ArticleBackButton";
import clsx from "clsx";
import { PortableText } from "next-sanity";
import Prism from "prismjs"
import { CodeBlock } from "@/components/CodeBlock";

export async function generateStaticParams() {
  const articles = await client.fetch<Article[]>("*[_type == 'article']")
  return articles.map(a => ({slug: a.slug.current}));
}

export default async function ArticlePage({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params;

  const article = await client.fetch<Article>(`*[_type == "article" && slug.current == $slug][0]`, {slug});

  return  (
    <Container className="mt-16 lg:mt-32">
      <div className="xl:relative">
         <div className="mx-auto max-w-2xl">
           <ArticleBackButton />
           <article>
            <header className="flex flex-col">
              <h1 className="mt-6 text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
                {article.title}
              </h1>
              <time
                dateTime={article.publishedAt}
                className="order-first flex items-center text-base text-zinc-400 dark:text-zinc-500"
              >
                <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
                <span className="ml-3">{formatDate(article.publishedAt)}</span>
              </time>
            </header>
            {/* <Prose className="mt-8" data-mdx-content>
              {children}
            </Prose> */}
             <div className={clsx("mt-8", 'prose dark:prose-invert')} data-mdx-content> 
                <PortableText 
                  value={article.body} 
                  components={{
                    types: {
                      code: ({value}) => {
                        return <CodeBlock code={value.code} language={value.language} />
                      },
                      image: ({value}) => {
                        console.log(value)
                        return <div></div>
                      }
                    }
                  }} 
                />
             </div>
          </article>
         </div>
      </div>
    </Container>
  );
}

function mapElements(arr: any[]) {
  const els: any[] = [];
  arr.forEach(el => {
    console.log(el)
    if (el._type === "block") {
      el.children.forEach((c: any) => {
        if (c._type === 'span') {
          
          els.push(<span key={c._key}>{c.text}</span>)
        }
      })
    }

    if (el._type === 'code') {
      els.push(<pre key={el._key} className="language-c">{el.code}</pre>)
    }
  })

  return els;
}