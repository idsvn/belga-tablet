import { useEffect, useState } from 'react';

import { useMutation } from 'react-query';
import { useSelector } from 'react-redux';

import tagService from 'src/services/tagService';

import { QueryParamType } from 'src/models/systemModel';
import { TagModel } from 'src/models/tagModel';

import { RootState } from 'src/redux/store';

import { globalLoading } from 'components/GlobalLoading';

interface UseUpdateTagsProps {
  tags: TagModel[];
  id: string;
}

export const useUpdateTags = ({ tags, id }: UseUpdateTagsProps) => {
  const [isFavorite, setIsFavorites] = useState<boolean>(false);

  const tagsSavedNews = useSelector<RootState, TagModel[]>(
    (state) => state.tagStore.tags,
  );

  useEffect(() => {
    setIsFavorites(
      tags.some(
        (tag) => (tag.type as QueryParamType) === QueryParamType.SAVED_NEWS,
      ),
    );
  }, [tags]);

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
        onSuccess: () => setIsFavorites((prev) => !prev),
        onSettled: () => globalLoading.hide(),
      },
    );
  };

  return { isFavorite, onUpdateFavorite };
};
