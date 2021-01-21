import { BaseStyles, Button, Flex, Heading } from '@primer/components'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import '../styles/globals.css'
import { Container } from '.';
import Link from 'next/link';

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  cache: new InMemoryCache(),
  headers: {
    authorization: `Bearer 0f7a63cf0fee7a6e4aa2f04f500df3729dcd30c7`,
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <BaseStyles>
        <Container>
          <Flex alignItems="center" justifyContent="space-between">
            <Link href="/">
            <a>
              <Heading as="h1">Message Bored</Heading>
            </a>
          </Link>
        <Button as="a" href="https://github.com/mattfwood/utterances-test/issues/new" target="_blank" rel="noopener">
          Create Post
        </Button>
          </Flex>

          <Component {...pageProps} />
        </Container>
      </BaseStyles>
    </ApolloProvider>
  )
}

export default MyApp
