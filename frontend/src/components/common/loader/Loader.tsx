import { NextPage } from 'next';

// interface LoaderProps {
//   show: boolean;
// }

export const Loader: NextPage = () => {
  return (
    <div
      id="loader"
      style={{
        background: 'rgba(255, 255, 255, 0.5)',
        width: '100%',
        height: '100%',
        zIndex: 99999,
        position: 'absolute',
        left: '0%',
        top: '50%',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: '40%',
          top: '50%',
        }}
      >
        <div className="lds-ellipsis">
          <p>Loading...</p>
          <div />
          <div />
          <div />
          <div />
        </div>
      </div>
    </div>
  );
};
