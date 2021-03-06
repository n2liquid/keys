const { button, span } = require('keys/dist/hh');

module.exports = (req, record, ctlName) => {
  const { actions } = req.ctls[ctlName];

  const stdBtnSel = '.keysStdListActions_btn';

  const stdBtns = {
    view: button(stdBtnSel, 'Ver', {
      'data-keys-href': `/keys/${ctlName}/view/${record.id}`,
    }),

    edit: button(stdBtnSel, 'Editar', {
      'data-keys-href': `/keys/${ctlName}/edit/${record.id}`,
    }),

    delete: button(stdBtnSel, 'Deletar', {
      'data-keys-method': 'post',
      'data-keys-action': `/keys/${ctlName}/delete/${record.id}`,
    }),
  };

  return span('.keysStdListActions',
    Object.keys(stdBtns).map(actionName => {
      const action = actions[actionName];

      if (!action) {
        return null;
      }

      const customBtn = action.views.listBtn || action.views.btn;

      if (customBtn) {
        return customBtn(req, record);
      }

      return stdBtns[actionName];
    }).filter(x => !!x),
  );
};
