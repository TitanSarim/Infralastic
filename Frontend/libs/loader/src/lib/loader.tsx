import styles from './loader.module.scss';
import { RotatingSquare } from 'react-loader-spinner';
import { Fragment } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
/* eslint-disable-next-line */
export interface LoaderProps {
  visible: boolean;
}

export function Loader(props: LoaderProps) {
  return (
    <Fragment>
      {props.visible && (
        <div className={styles['loader']}>
          <RotatingSquare
            height="100"
            width="100"
            color="#F81521"
            ariaLabel="rotating-square-loading"
            strokeWidth="4"
            wrapperStyle={{}}
            wrapperClass=""
            visible={props.visible}
          />
        </div>
      )}
    </Fragment>
  );
}

export default Loader;
