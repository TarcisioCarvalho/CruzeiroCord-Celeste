import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import React from 'react';
import {useRouter} from 'next/router'
import appConfig from '../config.json';





function Titulo(props){
    const Tag = props.tag;
  return(
    <>
    <Tag>{props.children}</Tag>
    
    <style jsx>{`

           ${Tag} {
               color: ${appConfig.theme.colors.neutrals['000']};
               font-size: 24px;
               font-wight: 600;
           } `

        }
       </style>
    </>
  );

  
  
}



// Componente React



/*function HomePage() {
    return ( 
    <div>
        
      <Titulo tag="h2">Boas Vindas de Volta!</Titulo>
       <h2>Discod - Alura Matrix</h2>
       

    </div>
   )}*/
  
  //export default HomePage


  export default function PaginaInicial() {
    //const username = 'TarcisioCarvalho';
    const [username,setUsername] = React.useState('TarcisioCarvalho');
    const roteamento = useRouter();
    const image = "https://i.pinimg.com/originals/22/37/26/2237261b1780cf8468495645e087b422.jpg";
    //<div style="width:100%;height:0;padding-bottom:56%;position:relative;"><iframe src="https://giphy.com/embed/3ohjV0xTr6aUO4vjMc" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/cruzeiro-raposa-raposao-3ohjV0xTr6aUO4vjMc">via GIPHY</a></p>

    return (
      <>
        
        <Box
          styleSheet={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backgroundColor: appConfig.theme.colors.primary[500],
           // backgroundImage: 'url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)',
           backgroundImage: 'url(https://i.pinimg.com/564x/16/2e/6b/162e6b004c5d8b075005046cb66744b2.jpg)',
            backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%', backgroundBlendMode: 'multiply',
          }}
        >
          <Box
            styleSheet={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: {
                xs: 'column',
                sm: 'row',
              },
              width: '100%', maxWidth: '700px',
              borderRadius: '5px', padding: '32px', margin: '16px',
              boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
              opacity: .8,
              backgroundColor: appConfig.theme.colors.neutrals[333],
            }}
          >
            {/* Formulário */}
            <Box
              as="form"
              onSubmit = {function(infosDoEvento){
                  infosDoEvento.preventDefault();
                  roteamento.push('/chat');
              }}
              styleSheet={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
              }}
            >
              <Titulo tag="h2">Boas vindas de volta!</Titulo>
              <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals['000'] }}>
                {appConfig.name}
              </Text>
  
              <TextField
                value={username}
                onChange={function event(event){
                  const valor = event.target.value
            
                    setUsername(valor)
                 
                  
                }}
                placeholder="Digite seu usuário"
                fullWidth
                textFieldColors={{
                  neutral: {
                    textColor: appConfig.theme.colors.neutrals[333],
                    mainColor: appConfig.theme.colors.neutrals['000'],
                    mainColorHighlight: appConfig.theme.colors.primary['000'],
                    backgroundColor: appConfig.theme.colors.neutrals['000']
                  },
                }}
              />
              <Button
                type='submit'
                label='Entrar'
                fullWidth
                buttonColors={{
                  contrastColor: appConfig.theme.colors.neutrals[333],
                  mainColor: appConfig.theme.colors.primary[333],
                  mainColorLight: appConfig.theme.colors.primary[333],
                  mainColorStrong: appConfig.theme.colors.primary['000'],
                }}
              />
            </Box>
            {/* Formulário */}
  
  
            {/* Photo Area */}
            <Box
              styleSheet={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: '200px',
                padding: '16px',
                backgroundColor: appConfig.theme.colors.neutrals[333],
                border: '1px solid',
                borderColor: appConfig.theme.colors.neutrals['000'],
                borderRadius: '10px',
                flex: 1,
                minHeight: '240px',
              }}
            >
              <Image
                styleSheet={{
                  borderRadius: '50%',
                  marginBottom: '16px',
                }}
               
                src={username.length > 2 ? `https://github.com/${username}.png`: image}
              />
              <Text
                variant="body4"
                styleSheet={{
                  color: appConfig.theme.colors.neutrals['000'],
                  backgroundColor: appConfig.theme.colors.neutrals[333],
                  padding: '3px 10px',
                  borderRadius: '1000px'
                }}
              >
                {username}
              </Text>
            </Box>
            {/* Photo Area */}
          </Box>
        </Box>
      </>
    );
            }