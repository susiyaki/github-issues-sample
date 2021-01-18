import React from 'react';
import marked from 'marked';
import {Box} from '@primer/components';
import '@primer/css/markdown/index.scss';

type Props = {
  markdonwText: string;
};

export const MarkdownViewer: React.FC<Props> = ({markdonwText}) => {
  const html = marked(markdonwText, {gfm: true});
  console.log(html);
  return (
    <Box
      className="markdown-body"
      dangerouslySetInnerHTML={{__html: html}}
      padding="15px"
    />
  );
};
