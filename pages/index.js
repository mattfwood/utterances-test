import { BorderBox, Box, Button, Flex, Heading } from '@primer/components';
import { gql, useQuery } from '@apollo/client';
import Head from 'next/head';
import Link from '@primer/components/lib/Link';

const ISSUES_QUERY = gql`
  query {
    repository(name: "utterances-test", owner: "mattfwood") {
      issues(first: 50) {
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
);

export default function Home() {
  const { data } = useQuery(ISSUES_QUERY);
  const posts = data?.repository?.issues?.nodes ?? [];

  return (
    <div>
      <Head>
        <title>Message Bored</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {posts.map((post) => (
        <Box p={3} mt={2}>
          <Heading fontSize={3}>{post.title}</Heading>
          <Box>
            <BorderBox p={2}>
              <div dangerouslySetInnerHTML={{ __html: post.bodyHTML }} />
            </BorderBox>
            <Link href={`/${post.number}`}>
              {post.comments.totalCount} Comments
            </Link>
          </Box>
        </Box>
      ))}

      <footer />
    </div>
  );
}
