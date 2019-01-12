import React, { Component } from "react";
import { Container, Col } from "reactstrap";
import { EntypoHeart } from "react-entypo";
import Highlight from "react-highlight";

import "../../node_modules/highlight.js/styles/atom-one-dark.css";

export default class Main extends Component {
  render() {
    return (
      <Container style={{ paddingTop: 53 }}>
        <Col id="main-content" style={{ paddingTop: 90 }} md="8">
          <h1>Welcome to Documate v1.0.2</h1>
          <p>
            Documate is a minimal static site generator for docs that takes your
            Markdown-based code and outputs a beautiful site (like this). The
            reason for using Markdown is simply because HTML-based docs (JSX,
            EJS, etc as well) seem to be cluttery with all the unnecessary tags
            that remove brevity and make readability a pain.
          </p>
          <p>
            Another bonus of using Markdown is that any GitHub docs of your
            previous projects (in Markdown) can be put into a site with
            Documate. All you need is to run <a href="#">two commands</a> and
            then you deploy. Although Documate can't deploy your builds for you,
            your builds are made production-ready and your readers can enjoy
            reading along.
          </p>
          <p>
            In a typical site, you could use a few simple commands to get
            started. To create a simple project, run <code>documate init</code>{" "}
            in the root directory of your project. Documate depends on{" "}
            <a href="javascript:void(0)">Create React App</a> and you{" "}
            <strong>will not</strong> need to eject. To run with webpack's
            devserver, use <code>documate start</code>.
          </p>
          <h2>Features</h2>
          {/* Dynamically insert this permalink */}
          <a className="anchor" href="#features">
            <svg
              aria-hidden="true"
              height="16"
              version="1.1"
              viewBox="0 0 16 16"
              width="16"
            >
              <path
                fill-rule="evenodd"
                d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
              />
            </svg>
          </a>
          <ul>
            <li>
              <b>Markdown-only -</b> You can embed HTML content in your Markdown
              files as usual
            </li>
            <li>
              <b>Minimal -</b> Documate is not opinionated about how you lay out
              or format your docs. In any case, it knows how to transpile your
              Markdown 1-1 to HTML.
            </li>
            <li>
              <b>Responsive -</b> Your site will look stunningly responsive and
              immersive across different viewports
            </li>
            <li>
              <b>Blazing fast serving -</b> Run documate start and view your
              docs locally in no time
            </li>
            <li>
              <b>Production-ready builds -</b> Your builds are minified and
              scripts uglified
            </li>
          </ul>

          <blockquote>
            <p>Note</p>
            <p>
              Documate doesn't generate docs from code comments. Instead it{" "}
              <strong>converts Markdown elements</strong> to a final static HTML{" "}
              site based on React's site.
            </p>
          </blockquote>

          <Highlight className="javascript">
            {`const timeout = (action, t) => after(actions.queue(action), exec, t);
const [time, useTime] = useState(0)

if (!defineAs('test-unit', ACTION))
  timeout(
    memoize((e) => console.log(e)),
    10
  )
`}
          </Highlight>

          <p>Without much further to say, let's get started!</p>

          <p>
            Made with{" "}
            <EntypoHeart style={{ verticalAlign: -2, color: "#ff7777" }} /> by{" "}
            <a href="javascript:void(0)">@bukharim96</a> and{" "}
            <a href="javascript:void(0)">@undefinedbuddy</a>.
          </p>
        </Col>
      </Container>
    );
  }
}
