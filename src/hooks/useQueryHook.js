import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  dleeteFirestore,
  getFirestore,
  getFirestoreSelect,
  setFirestore,
  updateFirestore
} from 'firestore/firestoreFns';

export function useQueryHook({ document }) {
  const { isLoading, isError, data } = useQuery({
    queryKey: [document],
    queryFn: async () => await getFirestore({ document })
  });

  return { isLoading, isError, data };
}

// 최초로 데이터를 생성할때 사용 O
export function useSetQuery({ document }) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ fieldId, data }) => {
      console.log(fieldId);
      console.log(data);
      setFirestore({ document, fieldId, data });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [document] });
    },
    onError: (error) => {
      console.log(`setQuery 실패 ${error}`);
    }
  });
}
//   문서를 업데이트할때 사용 O

export function useUpdateQuery({ document }) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ fieldId, data }) => updateFirestore({ document, fieldId, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [document] });
    },
    onError: (error) => {
      console.log(`updateQuery 실패 ${error}`);
    }
  });
}
//   문서를 삭제할때
export function useDeleteQuery({ document }) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ fieldId }) => dleeteFirestore({ document, fieldId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [document] });
    },
    onError: (error) => {
      console.log(`데이터 삭제 실패 ${error}`);
    }
  });
}

// 특정조건으로 문서를 읽어와야할때

export function useSelectQuery({ document, fieldId, condition }) {
  const { isLoading, isError, data } = useQuery({
    queryKey: [document, condition],
    queryFn: async () => await getFirestoreSelect({ document, fieldId, condition })
  });
  return { isLoading, isError, data };
}
