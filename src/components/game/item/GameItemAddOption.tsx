import React from 'react';
import {SearchResultProps} from 'semantic-ui-react';
import {CircularImage, CroppedMeta} from '~/components/ui';

export const GameItemAddOption: React.FC<SearchResultProps> = ({ image, title, description }) => (
  <>
    {image && (
      <div key="image" className="image">
        <CircularImage src={image} px={36}/>
      </div>
    )}
    <CroppedMeta key="content" className="content">
      {title && <div className="title">{title}</div>}
      {description && <div className="description">{description}</div>}
    </CroppedMeta>
  </>
);
