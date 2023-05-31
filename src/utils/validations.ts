export const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
export const passwordFormat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

interface IsChanged {
  gene: boolean;
  organismName: boolean;
  annotationScore: boolean;
  proteinWith: boolean;
  fromValue: boolean;
  toValue: boolean;
}

export const setApplyButtonStatus = (isChanged: IsChanged) => {
  for (const key in isChanged) {
    if (isChanged[key as keyof IsChanged]) {
      return true;
    }
  }
  return false;
};
