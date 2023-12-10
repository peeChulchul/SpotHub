import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  dleeteFirestore,
  getFirestore,
  getFirestoreSelect,
  getFirestoreSelectReference,
  setFirestore,
  updateFirestore,
  updateFirestoreReference
} from 'firestore/firestoreFns';
import swal from 'sweetalert';

export function useQueryHook({ document }) {
  const { isLoading, isError, data } = useQuery({
    queryKey: [document],
    queryFn: async () => await getFirestore({ document })
  });

  return { isLoading, isError, data };
}

// 최초로 데이터를 생성할때 사용 O
export function useSetQuery({ document, condition }) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ fieldId, data }) => {
      setFirestore({ document, fieldId, data });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: condition ? [document, condition] : [document] });
    },
    onError: (error) => {
      console.log(error);
      swal('데이터 로딩에 실패하였습니다.', '👎');
    }
  });
}
//   문서를 업데이트할때 사용 O

export function useUpdateQuery({ document, condition }) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ fieldId, data }) => updateFirestore({ document, fieldId, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: condition ? [document, condition] : [document] });
      swal('업데이트가 완료되었습니다.', '👍');
    },
    onError: (error) => {
      swal('업데이트가 실패하였습니다.', '👎');
    }
  });
}
export function useUpdateQueryReference({ document, condition }) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ ref, data }) => updateFirestoreReference({ ref, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: condition ? [document, condition] : [document] });
      swal('업데이트가 완료되었습니다.', '👍');
    },
    onError: (error) => {
      swal('업데이트가 실패하였습니다.', '👎');
    }
  });
}
//   문서를 삭제할때
export function useDeleteQuery({ document, condition }) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ fieldId }) => dleeteFirestore({ document, fieldId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: condition ? [document, condition] : [document] });
      swal('삭제가 완료되었습니다.', '👍');
    },
    onError: (error) => {
      swal('삭제가 실패하였습니다.', '👎');
      console.log(`${error}`);
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

export function useSelectQueryReference({ document, fieldId, condition }) {
  const { isLoading, isError, data } = useQuery({
    queryKey: [document, condition],
    queryFn: async () => await getFirestoreSelectReference({ document, fieldId, condition })
  });
  return { isLoading, isError, data };
}
