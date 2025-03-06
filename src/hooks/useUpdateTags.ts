import { useEffect } from 'react';

import { useMutation } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';

import tagService from 'src/services/tagService';

import { QueryParamType } from 'src/models/systemModel';
import { TagModel } from 'src/models/tagModel';

import {
  addSavedArticle,
  removeSavedArticle,
} from 'src/redux/slices/tagsSlice';
import { RootState } from 'src/redux/store';

import { globalLoading } from 'components/GlobalLoading';

interface UseUpdateTagsProps {
  tags: TagModel[];
  id: string;
}

export const useUpdateTags = ({ tags, id }: UseUpdateTagsProps) => {
  const isFavorite = useSelector<RootState, boolean>((state) =>
    state.tagStore.savedArticle.includes(id),
  );

  const dispatch = useDispatch();

  const tagsSavedNews = useSelector<RootState, TagModel[]>(
    (state) => state.tagStore.tags,
  );

  const updateFavorite = (addToFavorite: boolean) => {
    dispatch(addToFavorite ? addSavedArticle(id) : removeSavedArticle(id));
  };

  useEffect(() => {
    const isFavoriteFromTags = tags.some(
      (tag) => (tag.type as QueryParamType) === QueryParamType.SAVED_NEWS,
    );

    if (isFavoriteFromTags !== isFavorite) {
      updateFavorite(isFavoriteFromTags);
    }
  }, [JSON.stringify(tags)]);

  const { mutate } = useMutation({
    mutationFn: ({ tagId, data }: { tagId: string; data: any }) =>
      tagService.updateTag(tagId, data),
  });

  const onUpdateFavorite = () => {
    globalLoading.show();
    if (!id) return;

    const tagIds = tagsSavedNews?.map((tag) => tag.id) || [];

    mutate(
      { tagId: id, data: isFavorite ? [] : tagIds },
      {
        onSuccess: () => {
          updateFavorite(!isFavorite);
        },
        onSettled: () => globalLoading.hide(),
      },
    );
  };

  return { isFavorite: isFavorite, onUpdateFavorite };
};
