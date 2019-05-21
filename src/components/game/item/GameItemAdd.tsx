import React from 'react';
import {InjectedFormikProps, withFormik} from 'formik';
import {IAddItemRequest, IGameItemKind, IGameItemType} from '~/api/item';
import {AutocompleteField} from '~/components/fields';
import {GameItemAddOption} from './GameItemAddOption';
import {createSearch} from '~/stores/search';
import {useInjected} from '~/utils/injected';
import {ItemSegment} from '~/components/ui';
import {t} from '~/i18n';

type GameItemAddProps = {
  gameId: number;
  linkId: number;
  type: IGameItemType;
  kind?: IGameItemKind;
  onUpdate: (payload: IAddItemRequest) => void;
  autoFocus?: boolean;
};

type GameItemAddFormValues = {
  q: string;
  id: number;
  linkId: number;
};

type GameItemFormAddProps = InjectedFormikProps<GameItemAddProps, GameItemAddFormValues>;

function GameItemAddForm(props: GameItemFormAddProps) {
  const {isSubmitting, autoFocus, gameId: id, type, kind} = props;

  const {$search, resetSearch, getDebouncedSearch} = useInjected(createSearch);

  const handleSearch = (q: string) => {
    if (q.length >= 3) {
      getDebouncedSearch({q, id, type});
    }
  };

  const handleSelect = (value: string, title: string) => {
    const {setFieldValue, submitForm} = props;
    setFieldValue('id', value);
    setFieldValue('q', title);
    resetSearch(null);

    setTimeout(() => submitForm(), 1);
  };

  const searchOptions = $search.result ?
    $search.result.map(s => ({
      value: String(s.id),
      title: s.name,
      description: s.desc,
      image: s.pic,
    })) : [];

  const placeholder = kind === 'movie' ? t('item-search-movie') : t('item-search-actor');

  return (
    <ItemSegment kind={kind} attached={false}>
      <AutocompleteField
        name={'q'}
        size="small"
        minCharacters={3}
        showNoResults={false}
        results={searchOptions}
        placeholder={placeholder}
        onSearchChange={(e, {value}) => handleSearch(value)}
        onResultSelect={(e, {result}) => handleSelect(result.value, result.title)}
        resultRenderer={GameItemAddOption}
        loading={$search.loading}
        disabled={isSubmitting}
        autoFocus={autoFocus}
        onBlur={resetSearch}
        fluid
      />
    </ItemSegment>
  );
}

export const GameItemAdd = withFormik<GameItemAddProps, GameItemAddFormValues>({
  enableReinitialize: true,
  mapPropsToValues: (props) => ({
    q: '',
    id: null,
    linkId: props.linkId,
  }),
  handleSubmit: async ({id}, {setSubmitting, setError, props}) => {
    try {
      setError(null);
      const {gameId, type, onUpdate} = props;

      await onUpdate({gameId, id, type});
    } catch (e) {
      setError(e);
    } finally {
      setSubmitting(false);
      // resetForm();
    }
  }
})(GameItemAddForm);
