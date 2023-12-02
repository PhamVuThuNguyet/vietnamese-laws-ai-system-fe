/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import { useOnClickOutside } from 'usehooks-ts';

import styles from './styles.module.scss';

import { getCharterById } from '@/lib/api/charters';

type CharterModalProps = {
  onClose: () => void;
  data: Record<string, any>;
};

export default function CharterModal({ onClose, data }: CharterModalProps) {
  const ref = useRef(null);

  const [charterData, setCharterData] = useState(data);

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
