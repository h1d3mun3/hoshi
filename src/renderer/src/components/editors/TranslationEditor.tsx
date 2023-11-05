import React, { useMemo } from 'react';
import styled from '@emotion/styled';
import DataGrid, { Column } from 'react-data-grid';
import 'react-data-grid/lib/styles.css';
import { TranslationRow } from '../../modules/versions';
import TranslationIdCell from './cellRenderer/TranslationIdCell';
import renderTranslationCell from './cellRenderer/renderTranslationCell';
import renderTranslationEditCell from './cellRenderer/renderTranslationEditCell';

type Props = {
  isAvailable: boolean;
  languages: string[];
  rows: TranslationRow[];
};

// noinspection CssInvalidPropertyValue
const Frame = styled.div`
  contain: inline-size;
  height: 100%;

  padding-top: var(--spectrum-global-dimension-size-10, var(--spectrum-alias-size-10));
  padding-right: calc(var(--spectrum-global-dimension-size-10, var(--spectrum-alias-size-10)) * 2);
  overflow: scroll;
`;

const GridFrame = styled.div`
  height: 100%;
  .fill-grid {
    height: 100%;
  }
`;

const createColumns = (translations: string[]): Column<TranslationRow>[] => [
  { key: 'id', name: 'ID', resizable: true, frozen: true, width: 200, renderCell: TranslationIdCell },
  ...translations.map((lang) => ({
    key: `translation.${lang}`,
    name: lang,
    resizable: true,
    width: 200,
    renderCell: renderTranslationCell(lang),
    renderEditCell: renderTranslationEditCell(lang),
  })),
];

const TranslationEditor: React.FC<Props> = ({ isAvailable, rows, languages }) => {
  const columns = useMemo(() => createColumns(languages), [languages]);

  return (
    <Frame>
      {isAvailable && (
        <GridFrame>
          <DataGrid columns={columns} rows={rows} className="fill-grid" />
        </GridFrame>
      )}
    </Frame>
  );
};

export default TranslationEditor;
