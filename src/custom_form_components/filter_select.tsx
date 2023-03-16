import { LinkButton, useThemeColors, Modal, Button } from "@apitable/components"
import { AddOutlined, FilterOutlined } from "@apitable/icons"
import { Filter } from "@apitable/widget-sdk"
import { Strings, t } from '../i18n';

import React, { useEffect, useState } from "react"

interface IFilterSelect {
  value: any;
  onChange?: (filter: any) => void;
}

export const FilterSelect = ({ value, onChange }: IFilterSelect) => {
  const colors = useThemeColors();
  const [showModal, setShowModal] = useState<boolean>();

  const onConfirm = (filter) => {
    onChange?.(filter);
    setShowModal(false);
  }

  const filterLen = value ? value[Object.keys(value)[0]]?.length : 0;

  return (
    <div>
      {
        filterLen ?
          <Button
            variant="jelly"
            color="primary"
            prefixIcon={<FilterOutlined />}
            onClick={() => setShowModal(true)}
          >{filterLen}{t(Strings.filters_amount)}</Button> :
          <LinkButton
            href="javascript:void(0)"
            color={colors.textCommonPrimary}
            underline={false}
            prefixIcon={<AddOutlined size={16} />}
            onClick={() => setShowModal(true)}
          >
            {t(Strings.add_filter)}
          </LinkButton>
      }
      <FilterModal
        visible={showModal}
        onCancel={() => setShowModal(false)}
        onConfirm={onConfirm}
        value={value}
      />
    </div>
  )
}

const FilterModal = ({ value, visible, onCancel, onConfirm }) => {
  const [filter, setFilter] = useState(value);

  useEffect(() => {
    if (visible) {
      setFilter(value);
    } else {
      setFilter(null);
    }
  }, [visible, value])

  return (
    <Modal
      title={t(Strings.filter_modal_title)}
      visible={visible}
      onCancel={onCancel}
      onOk={() => onConfirm(filter)}
      cancelText={t(Strings.cancel)}
      okText={t(Strings.confirm)}
    >
      <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
        <Filter filter={filter} onChange={v => setFilter(v)}/>
      </div>
    </Modal>
  )
}