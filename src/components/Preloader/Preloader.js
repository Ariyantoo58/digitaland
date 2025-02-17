import React from 'react';

const Preloader = ({ loading, className = '' }) => {
  return (
    <div
      style={{
        zIndex: loading ? 9999 : -1,
      }}
      className={`preloader animated${loading ? '' : ' fadeOut'} ${className}`}
    >
      <div className="spinner">
        <div className="bounce1"></div>
        <div className="bounce2"></div>
        <div className="bounce3"></div>
      </div>

      <style jsx>{`
        .preloader {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: #ffffff;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .spinner {
          display: flex;
          gap: 4px;
        }

        .bounce1,
        .bounce2,
        .bounce3 {
          width: 12px;
          height: 12px;
          background-color: #333;
          border-radius: 100%;
          animation: bounce 1.4s infinite ease-in-out both;
        }

        .bounce1 {
          animation-delay: -0.32s;
        }

        .bounce2 {
          animation-delay: -0.16s;
        }

        @keyframes bounce {
          0%,
          80%,
          100% {
            transform: scale(0);
          }
          40% {
            transform: scale(1);
          }
        }

        .fadeOut {
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.5s ease-out, visibility 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Preloader;
