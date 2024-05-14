/* eslint-disable react/prop-types */
import React, { ChangeEvent, FocusEvent, KeyboardEvent, useEffect, useState } from 'react'
import { Flex, Heading, IconButton, ScrollArea, TextArea, TextField } from '@radix-ui/themes'
import Head from 'next/head'

function EditableText(props: any) {
  // state
  const [editingInternal, setEditingInternal] = useState(props.editing)
  const [valid, setValid] = useState<boolean>(true)
  const [valueInternal, setValueInternal] = useState<string>(props.value || '')
  const [savedValue, setSavedValue] = useState<string | undefined>(undefined)
  const [viewFocused, setViewFocused] = useState<boolean>(false)
  // refs
  const saveButton = React.createRef<HTMLButtonElement>()
  const editingContainer = React.createRef<HTMLDivElement>()
  const editingButtons = React.createRef<any>()

  useEffect(() => {
    if (props.cancelOnUnfocus && props.submitOnUnfocus) {
      console.warn('Cancelling')
    }
  }, [props.cancelOnUnfocus, props.submitOnUnfocus])

  useEffect(() => {
    if (props.value !== undefined) {
      setValueInternal(props.value)
      setSavedValue(props.value)
    }

    if (props.editing !== undefined) {
      setEditingInternal(props.editing)
    }
  }, [props.editing, props.value])

  function handleKeyDown(e: KeyboardEvent<any>): void {
    const isEnter = [13, 'Enter'].some((c) => e.key === c || e.code === c)
    const isEscape = [27, 'Escape', 'Esc'].some((c) => e.code === c || e.key === c)
    if (isEnter) {
      props.submitOnEnter && handleSave()
      e?.preventDefault()
    }
    if (isEscape) {
      props.cancelOnEscape && handleCancel()
      e.preventDefault()
    }
    props.inputProps?.onKeyDown && props.inputProps.onKeyDown(e)
  }

  function handleOnBlur(e: FocusEvent<any>): void {
    const isEditingButton = editingButtons.current?.contains(e?.relatedTarget)
    props.cancelOnUnfocus && !isEditingButton && handleCancel()
    props.submitOnUnfocus && !isEditingButton && !props.cancelOnUnfocus && handleSave()
    props.inputProps?.onBlur && props.inputProps.onBlur(e)
  }

  function handleViewFocus(e: FocusEvent<HTMLDivElement>): void {
    setViewFocused(true)
    props.startEditingOnFocus && setEditingInternal(true)
    props.viewProps?.onFocus && props.viewProps.onFocus(e)
  }

  function handleKeyDownForView(e: KeyboardEvent<any>): void {
    const isEnter = [13, 'Enter'].some((c) => e.key === c || e.code === c)
    const startEditing = isEnter && viewFocused && props.startEditingOnEnter
    startEditing && e.preventDefault()
    startEditing && setEditingInternal(true)
    props.viewProps?.onKeyDown && props.viewProps.onKeyDown(e)
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
    setValid(true)
    setValueInternal(e.target.value)
    props.inputProps?.onChange?.(e as any)
  }

  function handleCancel(): void {
    const val = savedValue ?? props.value
    setValid(true)
    setEditingInternal(false)
    setValueInternal(val)
    props.onCancel?.(val, props.inputProps)
  }

  function handleActivateEditMode(): void {
    //   if (getCanEdit(props.canEdit)) {
    setEditingInternal(true)
    props.onEditingStart?.(valueInternal, props.inputProps)
    //   }
  }

  async function handleSave(): Promise<void> {
    if (typeof props.validation === 'function') {
      const isValid = await props.validation(valueInternal)
      if (!isValid) {
        setValid(false)
        await props.onValidationFail?.(valueInternal)
        return
      }
    }
    setEditingInternal(false)
    setSavedValue(valueInternal)
    props.onSave(valueInternal, props.inputProps)
  }

  function _renderInput() {
    return (
      <TextField.Input
        radius="full"
        variant="surface"
        placeholder="Name the chat..."
        size="3"
        //   className="flex-1 rounded-3xl chat-textarea"
        tabIndex={0}
        value={valueInternal}
        onKeyDown={handleKeyDown}
        onBlur={handleOnBlur}
        onChange={handleInputChange}
        autoFocus={editingInternal}
      />
    )
  }

  function _renderEditingMode() {
    const inputElem = _renderInput()

    return (
      <div>
        <TextField.Root>
          {inputElem}
          <TextField.Slot>
            <IconButton size="3" variant="ghost" onClick={handleSave}>
              {props.saveButtonContent}
            </IconButton>
          </TextField.Slot>
          <TextField.Slot>
            <IconButton size="3" variant="ghost" onClick={handleCancel}>
              {props.cancelButtonContent}
            </IconButton>
          </TextField.Slot>
        </TextField.Root>
        {!valid && !props.onValidationFail && <div className={''}>{props.validationMessage}</div>}
        {props.hint && <div className={''}>{props.hint}</div>}
      </div>
    )
  }

  function _renderViewMode() {
    // calculate edit button classes
    const viewClickHandler = props.editOnViewClick ? handleActivateEditMode : undefined
    const _value =
      typeof props.renderValue === 'function' ? props.renderValue(valueInternal) : valueInternal
    return (
      <TextField.Root className={`group ${props.viewProps.className}`}>
        <Heading
          size="5"
          m="2"
          highContrast={true}
          tabIndex={props.tabIndex}
          {...props.viewProps}
          onKeyDown={handleKeyDownForView}
          onFocus={handleViewFocus}
          onClick={viewClickHandler}
        >
          {_value}
        </Heading>
        <TextField.Slot className={'invisible group-hover:visible'}>
          <IconButton
            size="3"
            variant="ghost"
            // type="button"
            // {...props.editButtonProps}
            highContrast={true}
            onClick={handleActivateEditMode}
          >
            {props.editButtonContent}
          </IconButton>
        </TextField.Slot>
      </TextField.Root>
    )
  }

  const mode = editingInternal ? _renderEditingMode() : _renderViewMode()
  return (
    <div className="h-10" {...props.containerProps}>
      {mode}
    </div>
  )
}

export default EditableText
