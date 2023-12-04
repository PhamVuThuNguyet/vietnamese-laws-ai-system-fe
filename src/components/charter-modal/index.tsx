/**
 * Copyright (c) VKU.NewEnergy.
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import { IoFlagOutline } from 'react-icons/io5';
import { IoClose } from 'react-icons/io5';
import { useOnClickOutside } from 'usehooks-ts';

import styles from './styles.module.scss';

import { getCharterById } from '@/lib/api/charters';

import FeedbackModal from '../feedback-modal';

type CharterModalProps = {
  onClose: () => void;
  data: Record<string, any>;
  keyword: string;
};

export default function CharterModal({
  onClose,
  data,
  keyword,
}: CharterModalProps) {
  const ref = useRef(null);

  const [charterData, setCharterData] = useState(data);
  const [feedbackData, setFeedbackData] = useState({});

  const fetchRelatedCharter = async (charter: Record<string, any>) => {
    const related = [];
    for (let i = 0; i < charter.related.length; i++) {
      if (!isNaN(charter.related[i].link)) {
        related.push(await getCharterById(charter.related[i].link));
      } else {
        related.push(charter.related[i]);
      }
    }
    return related;
  };

  const handleClickRelated = async (related: Record<string, any>) => {
    if (related.link) {
      if (related.link !== '#') {
        window.open(related.link, '_blank');
      }
    } else {
      const newCharter = await getCharterById(related.id);
      const relatedCharter = await fetchRelatedCharter(newCharter);
      setCharterData({ ...newCharter, related: relatedCharter });
    }
  };

  useEffect(() => {
    if (charterData.related.length > 0) {
      fetchRelatedCharter(charterData).then((related) => {
        setCharterData({ ...charterData, related });
      });
    }
    document.body.style.overflow = 'hidden';
  }, []);

  useOnClickOutside(ref, () => {
    document.body.style.overflow = 'unset';
    onClose();
  });

  return (
    <div className={styles.container}>
      <div className={styles.content} ref={ref}>
        {Object.values(feedbackData).length > 0 && (
          <FeedbackModal
            data={feedbackData}
            onClose={() => setFeedbackData({})}
          />
        )}
        <div className={styles.heading}>
          <div className={styles['heading-title']}>Nội dung văn bản</div>
          <div className={styles['heading-button-control']}>
            {keyword && (
              <div
                className={styles['heading-button']}
                onClick={() =>
                  setFeedbackData({
                    charter_title: charterData.name,
                    search_keyword: keyword,
                  })
                }
              >
                <IoFlagOutline size={18} />
              </div>
            )}
            <div className={styles['heading-button']} onClick={onClose}>
              <IoClose size={18} />
            </div>
          </div>
        </div>
        <div className={styles.title}>{charterData.name}</div>
        <div className={styles.note}>
          {charterData.note.map((note: Record<string, any>, index: number) => (
            <a key={index} target='_blank' href={note.link}>
              {note.description}
            </a>
          ))}
        </div>
        <div
          className={styles.description}
          dangerouslySetInnerHTML={{
            __html: charterData.description
              .replaceAll('\n\n', '</br>')
              .replaceAll('\n', '</br>'),
          }}
        ></div>
        {charterData.related.length > 0 && (
          <div className={styles.related}>
            Điều này có nội dung liên quan đến{' '}
            {charterData.related.map(
              (related: Record<string, any>, index: number) => (
                <span
                  key={index}
                  className={styles['related-item']}
                  onClick={() => handleClickRelated(related)}
                >
                  {related.name || related.description}.{' '}
                </span>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}
