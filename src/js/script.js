function sacarTildes(texto) {
    const mapaTildes = {
      'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u',
      'Á': 'A', 'É': 'E', 'Í': 'I', 'Ó': 'O', 'Ú': 'U',
      'ü': 'u', 'Ü': 'U'
    };
  
    return texto.replace(/[áéíóúÁÉÍÓÚüÜ]/g, letra => mapaTildes[letra] || letra);
  }
  
  const sacarComillas = (texto) => {
    return texto
      .replace(/"/g, '')  // Eliminar comillas
      .replace(/,\s*/g, ' ')  // Reemplazar comas y espacios posteriores con un solo espacio
      .trim();  // Eliminar espacios al principio y al final
  }
  
  export function extraerKeywords(texto) {
    const palabrasVacias = [
      "el", "la", "los", "las", "un", "una", "unos", "unas", "y", "o", "pero", 
      "si", "no", "en", "de", "a", "para", "por", "con", "sin", "que", "se", 
      "del", "al", "es", "son", "como", "más", "este", "esta", "estos", "estas",
      "hacia", "anuncio", "sobre", "entre", "durante", "hasta", "aún", "mientras", 
      "también", "así", "tan", "donde", "cual", "quien", "cuyo", "aunque", "siempre",
      "ni", "tampoco", "porque", "además", "ya", "muy", "mío", "tuyo", "suyo",
      "nuestro", "vuestro", "algo", "nada", "todo", "alguno", "ninguno", "cada", 
      "tanto", "demasiado", "poco", "algunos", "cualquier", "cualquiera", "tal", 
      "aquel", "aquella", "este", "esta", "ese", "esa"
  ];
  
  
    texto = sacarTildes(texto);
    // Tokenizar y limpiar el texto
    let palabras = texto.toLowerCase().match(/\b\w+\b/g) || [];
  
    // Filtrar palabras
    palabras = palabras.filter(palabra => 
      !palabrasVacias.includes(palabra) && palabra.length > 3
    );
  
    // Unir palabras en una cadena
    let textoFiltrado = palabras.join(' ');
  
    // Aplicar transformaciones
    
    textoFiltrado = sacarComillas(textoFiltrado);
    
    return textoFiltrado;
  }

