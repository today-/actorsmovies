import React, {useState} from 'react';
import styled from 'styled-components';
import {Card, Dimmer} from 'semantic-ui-react';
import {IGameItem, IRemoveItemRequest} from '~/api/item';
import {AlignedIcon, AlignedLink, CircularImage, CroppedMeta, ItemSegment} from '~/components/ui';

type GameItemProps = {
  gameId: number;
  isRemovable: boolean;
  onRemove: (params: IRemoveItemRequest) => void;
} & IGameItem;

export function GameItem(props: GameItemProps) {
  const {name, desc, url, isRemovable, type, gameId, onRemove, pic, kind} = props;

  const [isDeleting, setDeleting] = useState<boolean>(false);

  const handleRemove = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      setDeleting(true);
      await onRemove({type, gameId});
    } catch (e) {
      setDeleting(false);
    }
  };

  return (
    <Dimmer.Dimmable as={ItemSegment} kind={kind} dimmed={isDeleting} blurring>
      <CardContent>
        <a href={url} target={'_blank'}>
          <LeftImage src={pic} px={60}/>
        </a>
        <CardHeader>
          <AlignedLink href={url} target={'_blank'}>
            {name}
          </AlignedLink>
          {isRemovable && (
            <AlignedLink onClick={handleRemove}>
              <AlignedIcon name={'close'}/>
            </AlignedLink>
          )}
        </CardHeader>
        <CroppedMeta>
          {desc}
        </CroppedMeta>
      </CardContent>
      <Dimmer inverted active={isDeleting} />
    </Dimmer.Dimmable>
  );
}

const CardContent = styled(Card.Content)`
  flex: 1;
`;

const CardHeader = styled.div`
  font-weight: 700;
  font-size: 14px !important;
  display: flex !important;
  justify-content: space-between;
`;

const LeftImage = styled(CircularImage)`
  float: left;
`;
