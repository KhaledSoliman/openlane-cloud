/**
 * Filters Component
 */
import React from 'react';
import {
   RefinementList,
   RatingMenu,
   NumericMenu,
   Panel,
   ClearRefinements,
   RangeInput,
   SearchBox
} from 'react-instantsearch/dom';

// Card Component
import { RctCard, RctCardContent } from 'Components/RctCard';


const Filters = () => {
   return (
      <div className="filters-wrapper">
         <RctCard>
            <RctCardContent>
               <SearchBox
                  translations={{ placeholder: 'Search Products' }}
                  showLoadingIndicator
               />
            </RctCardContent>
         </RctCard>
         <RctCard className="brand">
            <RctCardContent>
               <Panel header="Brand">
                  <RefinementList
                     attribute="brand"
                     searchable
                     limit={5}
                  />
               </Panel>
            </RctCardContent>
         </RctCard>
         <RctCard className="type">
            <RctCardContent>
               <Panel header="Type">
                  <RefinementList
                     attribute="type"
                     limit={5}
                  />
               </Panel>
            </RctCardContent>
         </RctCard>
         <RctCard className="categories">
            <RctCardContent>
               <Panel header="Category">
                  <RefinementList
                     attribute="categories"
                     searchable
                     limit={5}
                  />
               </Panel>
            </RctCardContent>
         </RctCard>
         <RctCard className="price">
            <RctCardContent>
               <Panel
                  header="Price"
                  className="mb-20"
               >
                  <NumericMenu
                     attribute="price"
                     items={[
                        { end: 10, label: 'Below $10' },
                        { start: 10, end: 100, label: '$10 - $100' },
                        { start: 100, end: 500, label: '$100 - $500' },
                        { start: 500, label: 'Above $500' },
                     ]}
                  />
               </Panel>
               <Panel header="Enter Price Range">
                  <RangeInput
                     attribute="price"
                     className="py-2"
                     translations={{
                        submit: 'Go',
                        separator: '-'
                     }}
                  />
               </Panel>
            </RctCardContent>
         </RctCard>
         <RctCard>
            <RctCardContent>
               <Panel header="Rating Menu">
                  <RatingMenu
                     attribute="rating"
                     min={1}
                     max={5}
                     translations={{
                        ratingLabel: ""
                     }}
                  />
               </Panel>
            </RctCardContent>
         </RctCard>
         <RctCard>
            <RctCardContent>
               <ClearRefinements />
            </RctCardContent>
         </RctCard>
      </div>
   )
}
export default Filters;