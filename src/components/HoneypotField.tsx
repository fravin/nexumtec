interface HoneypotFieldProps {
  value: string;
  onChange: (value: string) => void;
}

/**
 * Campo-armadilha contra robôs: fica fora da tela e fora da navegação por
 * teclado e leitores de tela. Pessoas não o preenchem; robôs que preenchem
 * todos os campos sim, e o servidor descarta o envio (campo "website").
 */
const HoneypotField = ({ value, onChange }: HoneypotFieldProps) => (
  <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}>
    <label>
      Não preencha este campo
      <input
        type="text"
        name="referencia_interna"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  </div>
);

export default HoneypotField;
