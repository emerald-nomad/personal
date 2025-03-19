import { Container } from "@/components/Container";
import { formatDate } from "@/lib/formatDate";
import { ArticleBackButton } from "@/components/ArticleBackButton";
import clsx from "clsx";
import { defineQuery, PortableText } from "next-sanity";
import { CodeBlock } from "@/components/CodeBlock";
import imageUrlBuilder from '@sanity/image-url'
import { client } from "@/sanity/client";

const GET_ARTICLE_SLUGS_QUERY = defineQuery(`
  *[_type == 'article'] {
    slug                                     
  }
 `)

export async function generateStaticParams() {
  const articles = await client.fetch(GET_ARTICLE_SLUGS_QUERY);

  return articles.map(a => ({slug: a.slug!.current}));
}

const GET_ARTICLE_QUERY = defineQuery(`*[_type == "article" && slug.current == $slug][0]`);

export default async function ArticlePage({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params;

  const article = await client.fetch(GET_ARTICLE_QUERY, {slug})

  if (!article) {
    return null;
  }

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
                <span className="ml-3">{formatDate(article.publishedAt!)}</span>
              </time>
            </header>
             <div className={clsx("mt-8", 'prose dark:prose-invert')} data-mdx-content> 
                <PortableText 
                  value={article.body!} 
                  components={{
                    types: {
                      code: ({value}) => {
                        return <CodeBlock code={value.code} language={value.language} />
                      },
                      image: ({value}) => {
                        const url = imageUrlBuilder(client).image(value.asset).url();
                        return <img src={url} alt=""  />
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
