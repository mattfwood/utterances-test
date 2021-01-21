import { BorderBox, Box, Button, Flex, Heading } from '@primer/components'
import { gql, useQuery } from '@apollo/client';
import Head from 'next/head'
import Link from '@primer/components/lib/Link';

const ISSUES_QUERY = gql`
query {
  repository(name: "utterances-test", owner:"mattfwood") {
    issues(first:50) {
      nodes {
        title
        body
        bodyHTML
        number
        # author {
        #   avatarUrl
        #   login
        # }
        comments {
          totalCount
        }
      }
    }
  }
}
`;

export const Container = ({ children }) => (
  <Flex as="main" justifyContent="center" p={3}>
    <Box width="100%" maxWidth="768px">
      {children}
    </Box>
  </Flex>
)

export default function Home() {
  const { data } = useQuery(ISSUES_QUERY)
  console.log(data)

  const posts = data?.repository?.issues?.nodes ?? [];
  console.log(posts)
  return (
    <div>
      <Head>
        <title>Message Bored</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>


        {posts.map(post => (
          <Box p={3} mt={2}>
            <Link href={`${post.body}`}>
            <Heading as="a" color="#333" fontSize={2}>{post.title}</Heading>
              </Link>
            <Box>
              <BorderBox p={2}>
                <div dangerouslySetInnerHTML={{ __html: post.bodyHTML }} />

              </BorderBox>
              <Link href={`/${post.number}`}>
              {post.comments.totalCount} Comments
              </Link>
            </Box>
          </Box >
        ))}

      <footer>

      </footer>
    </div>
  )
}
