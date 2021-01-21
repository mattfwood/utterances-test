import { gql, useQuery } from '@apollo/client';
import { BorderBox } from '@primer/components';
import React, { Component } from 'react'
import { useRouter } from 'next/router';

class Comments extends Component {

  constructor(props){
    super(props);
    this.commentBox = React.createRef();
  }
  componentDidMount () {
      let scriptEl = document.createElement("script");
      scriptEl.setAttribute("src", "https://utteranc.es/client.js");
      scriptEl.setAttribute("crossorigin","anonymous");
      scriptEl.setAttribute("async", true);
      // scriptEl.setAttribute("repo", "vincentntang/vincentntang.com-comments");
      scriptEl.setAttribute("repo", "mattfwood/utterances-test");
      scriptEl.setAttribute("issue-term", this.props.issueNumber);
      scriptEl.setAttribute( "theme", "github-light");
      this.commentBox.current.appendChild(scriptEl);
  }

  render() {
    return (
        <div ref={this.commentBox} className="comment-box"></div>
    );
  }
}

const ISSUE_QUERY = gql`
  query IssueQuery($number: Int!) {
    repository(name: "utterances-test", owner:"mattfwood") {
      issue(number: $number) {
        title
        body
        bodyHTML
        comments {
          totalCount
        }
      }
    }
  }
`;

export default function Page() {
  const router = useRouter();
  const issueNumber = router.query.id;
  const { data } = useQuery(ISSUE_QUERY, {
    variables: {
      number: parseInt(issueNumber)
    }
  })
  console.log({ data, issueNumber, })
  return (
    <div>
      <BorderBox p={2}>
        <div dangerouslySetInnerHTML={{ __html: data?.repository?.issue?.bodyHTML }} />
      </BorderBox>
      <Comments issueNumber={issueNumber} />
    </div>
  )
  // return (
  //   <div className="utterances">
  //     <div className="utterances-frame">
  //       <script src="https://utteranc.es/client.js"
  //         data-repo="mattfwood/utterances-test"
  //         data-issue-term="url"
  //         data-label="comments"
  //         data-theme="photon-dark"
  //         crossorigin="anonymous"
  //         async>
  //       </script>

  //     </div>
  //   </div>
  // )
}
