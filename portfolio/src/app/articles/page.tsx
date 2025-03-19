import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { formatDate } from '@/lib/formatDate'
import { GET_ARTICLES_QUERYResult } from '@/sanity/types'
import { defineQuery } from 'next-sanity'
import { client } from '@/sanity/client'

const GET_ARTICLES_QUERY = defineQuery(`
  *[_type == 'article'] | order(publishedAt desc) {
    title, 
    description,
    publishedAt,
    slug                                
  }
 `)

export default async function ArticlesIndex() {
  const articles = await client.fetch(GET_ARTICLES_QUERY)

  return (
    <SimpleLayout
      title="Writing on software design, company building, and the aerospace industry."
      intro="All of my long-form thoughts on programming, leadership, product design, and more, collected in chronological order."
    >
      <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        <div className="flex max-w-3xl flex-col space-y-16">
          {articles.map((article) => (
            <Article key={article.slug!.current} article={article} />
          ))}
        </div>
      </div>
    </SimpleLayout>
  )
}

function Article({ article }: { article: GET_ARTICLES_QUERYResult[0] }) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`/articles/${article.slug!.current}`}>
          {article.title}
        </Card.Title>
        <Card.Eyebrow
          as="time"
          dateTime={article.publishedAt!}
          className="md:hidden"
          decorate
        >
          {formatDate(article.publishedAt!)}
        </Card.Eyebrow>
        <Card.Description>{article.description}</Card.Description>
        <Card.Cta>Read article</Card.Cta>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={article.publishedAt!}
        className="mt-1 max-md:hidden"
      >
        {formatDate(article.publishedAt!)}
      </Card.Eyebrow>
    </article>
  )
}