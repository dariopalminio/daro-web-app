import "./paper.css";

interface Props {
    className?: string;
    style?: any;
    children?: React.ReactNode;
}

/**
 * Paper for container
 */

const Paper: React.FC<Props> = ({ className, children, style }) => {

    return (
        <div className={className ? className : "paper-container"}
            style={style ? style : {}}>
            {children}
        </div>
    );
};

export default Paper;