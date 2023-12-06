const handleUpload = async () => {
  const imageRef = ref(storage, `${auth.currentUser.uid}/${selectedFile.name}`);
  await uploadBytes(imageRef, selectedFile);

  // 파일 URL 가져오기
  const downloadURL = await getDownloadURL(imageRef);
  console.log(downloadURL);
};
