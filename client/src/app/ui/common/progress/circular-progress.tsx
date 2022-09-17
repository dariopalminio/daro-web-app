import "./circular-progress.css";

interface Props {
  children?: React.ReactNode;
}

/**
 * Circular Progress for loading process
 */
  const CircularProgress: React.FC<Props> = ({ children }) => {

  return (
    <div className="circular-loader-container">
      <label className='label-circular-loader'>{children}</label>
      <div className="circular-loader"></div>
    </div>
  );
};

export default CircularProgress;