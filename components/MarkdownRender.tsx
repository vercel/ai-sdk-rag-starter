import ReactMarkdown from 'react-markdown';
import MathJax from 'react-mathjax';
import RemarkMathPlugin from 'remark-math';

type MarkdownRenderProps = {
    children: string;
    plugins?: any;
    renderers?: any;
}

type MathProps = {
    value: string;
}

const MarkdownRender = (props: MarkdownRenderProps) => {

    let children = props.children;
    
    let newProps = {
        ... props,
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
    <MathJax.Provider>
        <ReactMarkdown {...newProps}>
            {children}
        </ReactMarkdown>
    </MathJax.Provider>
    );
}

export default MarkdownRender
