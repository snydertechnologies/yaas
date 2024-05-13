// @ts-nocheck
import { createSelector } from 'reselect';
import { pickItemsFromIds } from '@bigcapital/webapp/store/selectors';
import { getResourceColumn } from '@bigcapital/webapp/store/resources/resources.reducer';

const resourceViewsIdsSelector = (state, props, resourceName) => state.views.resourceViews[resourceName];

const viewsSelector = (state) => state.views.views;
const viewByIdSelector = (state, props) => state.views.views[props.viewId];

const viewColumnsSelector = (state, props) => {};

export const getResourceViews = createSelector(resourceViewsIdsSelector, viewsSelector, (resourceViewsIds, views) => {
  return pickItemsFromIds(views, resourceViewsIds);
});

export const getViewMetaFactory = () =>
  createSelector(
    viewByIdSelector,
    // viewColumnsSelector,
    (view, viewColumns) => {
      return view;
    },
  );

export const getViewItemFactory = () =>
  createSelector(
    viewByIdSelector,
    // viewColumnsSelector,
    (view, viewColumns) => {
      return view;
    },
  );

export const getViewPages = (resourceViews, viewId) => {
  return typeof resourceViews[viewId] === 'undefined' ? {} : resourceViews[viewId].pages;
};
