import { Container } from "@/components/Container";
import { formatDate } from "@/lib/formatDate";
import { ArticleBackButton } from "@/components/ArticleBackButton";
import clsx from "clsx";
import { PortableText } from "next-sanity";
import { CodeBlock } from "@/components/CodeBlock";
import { execute, graphql } from "@/graphql";
import imageUrlBuilder from '@sanity/image-url'
import Image from "next/image";
import { client } from "@/sanity/client";

export async function generateStaticParams() {
  const query = graphql(`query ArticleSlugs {
      allArticle {
        slug {
          current
        }
      }
  }`);
  
  const articles = (await execute(query)).allArticle;

  return articles.map(a => ({slug: a.slug!.current}));
}

export default async function ArticlePage({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params;

  const query = graphql(`
    query Article($slug: String!) {
      allArticle(
        where: {
          slug: {
            current: {
              eq: $slug
            }
          }
        }
      ) {
        title
        description
        slug {
          current
        }
        publishedAt
        bodyRaw
      }
    }
  `);

  const article = (await execute(query, {slug})).allArticle[0];

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
                  value={article.bodyRaw} 
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
