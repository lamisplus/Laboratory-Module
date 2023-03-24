import React, {useState, useEffect} from 'react';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {url} from '../../../api'

export default function FixedTags(props) {
    const [optionsample, setOptionsample] = useState([]);
    useEffect(() => {
        async function getCharacters() {
          try {
            const response = await fetch(url+'application-codesets/codesetGroup?codesetGroup=SAMPLE_TYPE');
            const body = await response.json();
            setOptionsample(body.map(({ display, id }) => ({ title: display, value: id })));
          } catch (error) {
            console.log(error);
          }
        }
        getCharacters();
      }, []);
      /* ##### End of gender parameter from the endpoint ##########*/
  return (
    <Autocomplete
      multiple
      id="sample_type"
      options={optionsample}
      getOptionLabel={(option) => option.title}
      
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip label={option.title} {...getTagProps({ index })} disabled={index === 0} />
        ))
      }
      style={{ width: 'auto' }}
      renderInput={(params) => (
        <TextField {...params} variant="outlined" margin="normal" label="Sample Type "  />
      )}
      onChange={props.onChange}
    />
  );
}

