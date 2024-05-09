type Props = {
  header?: boolean;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  onAction?: () => void;
};

function ActionButton(props: Pick<Props, 'onAction'>) {
  if (!props.onAction) return null;
  return (
    <button
      onClick={props.onAction}
      className="btn btn--icon-square btn--table-action ml-s-50"
    >
      <div className="btn__body">
        <span className="material-symbols-outlined btn__body__icon">
          arrow_drop_down
        </span>
      </div>
    </button>
  );
}

export default function TableCheckbox(props: Props) {
  if (props.header) {
    return (
      <th className="table__cell table__cell--checkbox">
        <div className="table__cell__content">
          <div className="form-check">
            <input
              checked={props.checked}
              onChange={(event) => props.onChange?.(event.target.checked)}
              className="form-check-input"
              type="checkbox"
              id="checkbox"
            />
          </div>
          <ActionButton onAction={props.onAction} />
        </div>
      </th>
    );
  } else {
    return (
      <td className="table__cell table__cell--checkbox">
        <div className="table__cell__content">
          <div className="form-check">
            <input
              checked={props.checked}
              onChange={(event) => props.onChange?.(event.target.checked)}
              className="form-check-input"
              type="checkbox"
              id="checkbox"
            />
          </div>
        </div>
      </td>
    );
  }
}
