/* eslint-disable no-case-declarations */
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

export function getOrderNode(nodeType: NodeTypes, node: Record<string, any>) {
  switch (nodeType) {
    case NodeTypes.TOPIC:
      const id = Number(node.data.id.slice(node.data.type.length + 1));
      return id;
    case NodeTypes.SUBJECT:
      const rowIndex = node.rowIndex;
      const parentRowIndex = node.parent.rowIndex;
      return rowIndex - parentRowIndex;
    case NodeTypes.INDEXING:
      return '';
    case NodeTypes.CHARTER:
      return '';
    default:
      throw new Error('Node type is not valid');
  }
}

export function getVietnamesNameNodeTypes(nodeType: NodeTypes) {
  switch (nodeType) {
    case NodeTypes.TOPIC:
      return 'Chủ đề số';
    case NodeTypes.SUBJECT:
      return 'Đề mục số';
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
