import { NodeTypes } from './types';

export function getFromLocalStorage(key: string): string | null {
  if (typeof window !== 'undefined') {
    return window.localStorage.getItem(key);
  }
  return null;
}

export function getFromSessionStorage(key: string): string | null {
  if (typeof sessionStorage !== 'undefined') {
    return sessionStorage.getItem(key);
  }
  return null;
}

export function getVietnamesNameNodeTypes(nodeType: NodeTypes) {
  switch (nodeType) {
    case NodeTypes.TOPIC:
      return 'Chủ đề';
    case NodeTypes.SUBJECT:
      return 'Đề mục';
    case NodeTypes.LEGAL_DOCUMENT:
      return 'Văn bản pháp luật';
    case NodeTypes.INDEXING:
      return 'Chương';
    case NodeTypes.CHARTER:
      return 'Điều';
    default:
      throw new Error('Node type is not valid');
  }
}
