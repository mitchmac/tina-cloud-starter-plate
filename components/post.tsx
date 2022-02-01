import ReactMarkdown from "react-markdown";
import { InlineWysiwyg } from "react-tinacms-editor";
import { InlineText } from "react-tinacms-inline";
import type {
  Authors_Document,
  Article_Doc_Data,
} from "../.tina/__generated__/types";

export const BlogPost = (props: Article_Doc_Data) => {
  return (
    <>
      <InlineText name="title">
        <h1>{props.title}</h1>
      </InlineText>
      <AuthorSnippet author={props.author} />
      <InlineWysiwyg name="_body">
         <ReactMarkdown>{props._body}</ReactMarkdown>
      </InlineWysiwyg>
    </>
  );
};

const AuthorSnippet = (props: { author: Authors_Document }) => {
  return (
    <div className="snippet">
      {props.author && (
        <>
          <img
            className="avatar"
            title={props.author.data.name}
            src={props.author.data.avatar}
          />
          <h3>By {props.author.data.name}</h3>
        </>
      )}
      <style jsx>{`
        .snippet {
          display: flex;
          align-items: center;
        }
        .avatar {
          height: 50px;
          margin-right: 10px;
          object-fit: cover;
          width: 50px;
          border-radius: 50%;
          background-size: cover;
          background-position: center;
        }
      `}</style>
    </div>
  );
};
