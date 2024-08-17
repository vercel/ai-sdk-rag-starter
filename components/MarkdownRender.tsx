import ReactMarkdown from 'react-markdown';
import MathJax from 'react-mathjax';
import RemarkMathPlugin from 'remark-math';

type MarkdownRenderProps = {
    children: React.ReactNode;
    plugins: any;
    renderers: any;
}

type MathProps = {
    value: string;
}

const MarkdownRender = (props: MarkdownRenderProps) => {
    
    const newProps = {
        ...props,
        remarkPlugins: [
          RemarkMathPlugin,
        ],
        components: {
          ...props.renderers,
          math: (props: MathProps) =>
            <MathJax.Node formula={props.value} />,
          inlineMath: (props: MathProps) => {
            <MathJax.Node inline formula={props.value} />
        }
      }
    }

    return (
    <MathJax.Provider input="tex">
        <ReactMarkdown {...newProps} />
    </MathJax.Provider>
    );
}

export default MarkdownRender
