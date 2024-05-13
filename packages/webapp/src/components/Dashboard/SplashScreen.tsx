import withDashboard from '@bigcapital/webapp/containers/Dashboard/withDashboard';
// @ts-nocheck
import * as R from 'ramda';
import BigcapitalLoading from './BigcapitalLoading';

function SplashScreenComponent({ splashScreenLoading }) {
  return splashScreenLoading ? <BigcapitalLoading /> : null;
}

export const SplashScreen = R.compose(
  withDashboard(({ splashScreenLoading }) => ({
    splashScreenLoading,
  })),
)(SplashScreenComponent);
