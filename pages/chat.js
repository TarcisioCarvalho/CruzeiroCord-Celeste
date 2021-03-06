/*export default function PaginaChat(){
    return(
        <body style={{ backgroundImage: 'url(https://i.pinimg.com/564x/16/2e/6b/162e6b004c5d8b075005046cb66744b2.jpg)'}}>
        <p style={{textAlign:"center", fontSize:"px"}}>Página Chat</p>
        </body>

       
    )
}*/


import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import PaginaInicial from './index';
import appConfig from '../config.json';
import {ButtonSendSticker} from '../src/components/ButtonSendSticker'






const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzI5MTM0MywiZXhwIjoxOTU4ODY3MzQzfQ.vXXUcQLCvv82wcsBwl0wezaJC3phiKIM4pQDSYfofEQ'
const SUPABASE_URL = 'https://kbufjlbqkvpemmumvtwh.supabase.co'
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

function escutaMensagensEmTempoReal(adcionaMensagem){
    return supabaseClient
    .from('Mensagens')
    .on('INSERT',(respostaLive)=>{
            adcionaMensagem(respostaLive.new)
    })
    .subscribe()
}

export default function ChatPage() {
    // Sua lógica vai aqui

    const [mensagem,setMensagem] = React.useState('');
    const [listaMensagens,setListaMensagens] = React.useState([])
    const [isLoaded, setIsLoaded] = useState(false)
   

    const router = useRouter();
    const { username } = router.query;


    React.useEffect( ()=>{
        supabaseClient
        .from('Mensagens')
        .select('*')
        .order('id', {ascending: false})
        .then(({data})=>{
            setListaMensagens(data);
            setIsLoaded(true)
        })

        const subscription = escutaMensagensEmTempoReal((novaMensagem) => {
           // console.log('Nova mensagem:', novaMensagem);
           // console.log('listaDeMensagens:', listaDeMensagens);
            // Quero reusar um valor de referencia (objeto/array) 
            // Passar uma função pro setState
      
            // setListaDeMensagens([
            //     novaMensagem,
            //     ...listaDeMensagens
            // ])
            setListaMensagens((valorAtualDaLista) => {
              console.log('valorAtualDaLista:', valorAtualDaLista);
              return [
                novaMensagem,
                ...valorAtualDaLista,
              ]
            });
          });

    })

    function handleNovaMensagem(novaMensagem){

        if(!novaMensagem) return
        if(novaMensagem.trim() === '') return

        const mensagem ={
            //id: listaMensagens.length,
            de: username,
            texto: novaMensagem.trim()
        }

        supabaseClient
        .from('Mensagens')
        .insert([
            mensagem
        ])
        .then( ({data}) =>{
           /* setListaMensagens([
                data[0],
                ...listaMensagens,
            ])*/
        } )

       /* setListaMensagens([
            mensagem,
            ... listaMensagens , 
        ]);*/
        setMensagem('');
    }

    function handleDeletarMensagem(event) {
        const messageId = Number(event.target.dataset.id)

        supabaseClient
        .from('Mensagens')
        .delete()
        .match({ id: messageId})
        .then(({data})=>{
            const messageListFiltered = listaMensagens.filter((messageFiltered) => {
                return messageFiltered.id != data[0].id
        })

        setListaMensagens(messageListFiltered)
        })

        
    }


   

    if (!isLoaded) {
        return (
            <>
                <style global jsx>{`
                    .loading-image {
                        max-width: 200px;
                        max-height: 200px;
                        animation: rotation .5s linear infinite; 
                    }
                    @keyframes rotation {
                        to {
                            transform: rotate(360deg);
                        }
                    }
                `}</style>

                <Box
                    styleSheet={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        backgroundColor: 'rgba(0,0,0,0.6)',
                        backgroundImage: 'url(https://i.pinimg.com/564x/6e/cc/e5/6ecce52666fa6b4f0e0a7bd1926c2744.jpg)',
                        backgroundRepeat: 'repeat', backgroundSize: '10%', backgroundBlendMode: 'multiply',
                        color: appConfig.theme.colors.neutrals['000']
                    }}
                >

                    <img src="emblemacruzeiro.jpg" className='loading-image' />
                </Box>
            </>
        )
    }

    // ./Sua lógica vai aqui
    if (isLoaded) {
        return (
            <Box
                styleSheet={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: appConfig.theme.colors.primary['000'],
                    backgroundImage: `url(https://i.pinimg.com/564x/6e/cc/e5/6ecce52666fa6b4f0e0a7bd1926c2744.jpg)`,
                    backgroundRepeat: 'repeat', backgroundSize: '10%', backgroundBlendMode: 'multiply',
                    color: appConfig.theme.colors.neutrals['000']
                }}
            >
                <Box
                    styleSheet={{
                        display: 'flex',
                        flexDirection: 'column',
                        flex: 1,
                        boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                        borderRadius: '5px',
                        backgroundColor: appConfig.theme.colors.neutrals[333],
                        height: '100%',
                        maxWidth: '95%',
                        maxHeight: '95vh',
                        padding: '32px',
                        opacity: '0.9'
                    }}
                >
                    <Header />
                    <Box
                        styleSheet={{
                            position: 'relative',
                            display: 'flex',
                            flex: 1,
                            height: '80%',
                            backgroundColor: appConfig.theme.colors.neutrals['000'],
                            flexDirection: 'column',
                            borderRadius: '5px',
                            padding: '16px',
                        }}
                    >
                       
                            
                     
                         <MessageList mensagem={listaMensagens} handleDeletarMensagem={handleDeletarMensagem} /> 
    
                        <Box
                            as="form"
                            styleSheet={{
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <ButtonSendSticker
                            onStickerClick = {(sticker)=>{
                                handleNovaMensagem(':Sticker:' + sticker)
                            }}
                            
                            />
                            <TextField
                                value={mensagem}
                                onChange={(event) => {
                                    const valor = event.target.value;
                                    setMensagem(valor);
                                }}
                                onKeyPress={(event)=>{
                                    if(event.key === 'Enter'){
                                        event.preventDefault();
                                        handleNovaMensagem(mensagem)
                                    }
                                }}
                                placeholder="Insira sua mensagem aqui..."
                                type="textarea"
                                styleSheet={{
                                    width: '95%',
                                    border: '0',
                                    resize: 'none',
                                    borderRadius: '5px',
                                    padding: '6px 8px',
                                    backgroundColor: appConfig.theme.colors.neutrals[333],
                                    marginRight: '12px',
                                    color: appConfig.theme.colors.neutrals['000'],
                                }}
                            />
                            
                            <Button
                                onClick={() => handleNovaMensagem(mensagem)}
                                label=''
                                fullWidth
                                styleSheet={{
                                    Width: '50px',
                                    Height: '50px',
                                    borderRadius: '50%',
                                  
                                    backgroundImage : 'url(https://cdn-icons-png.flaticon.com/512/53/53283.png)',
                                    backgroundSize: 'cover'
                                    
                                }}
                                buttonColors={{
                                    contrastColor: appConfig.theme.colors.neutrals["000"],
                                    mainColor: appConfig.theme.colors.primary['000'],
                                    mainColorLight: appConfig.theme.colors.primary['000'],
                                    mainColorStrong: appConfig.theme.colors.primary[333],
                                }}
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>
        )
    }
    
    }
function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                    buttonColors={{
                        contrastColor: appConfig.theme.colors.neutrals["000"],
                        mainColor: appConfig.theme.colors.primary[333],
                        mainColorLight: appConfig.theme.colors.primary[333],
                        mainColorStrong: appConfig.theme.colors.primary[333],
                    }}
                />
                 
            </Box>
        </>
    )
}

function MessageList(props) {
  const handleDeletarMensagem = props.handleDeletarMensagem
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'scroll',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals[333],
                marginBottom: '16px',
            }}
        >
            {props.mensagem.map((mensagem)=>{
                return(
                    <Text
                key={mensagem.id}
                tag="li"
                styleSheet={{
                    borderRadius: '5px',
                    padding: '6px',
                    marginBottom: '12px',
                    hover: {
                        backgroundColor: appConfig.theme.colors.neutrals[111],
                    }
                }}
            >
                <Box
                    styleSheet={{
                        marginBottom: '8px',
                    }}
                >   
                    <Image 
                        //onClick = { alert('ola')}
                        styleSheet={{
                            
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            display: 'inline-block',
                            marginRight: '8px',
                            hover: {
                                transform: 'scale(2.5)',
                                marginLeft: '20px',
                                marginRight: '20px'
                             
                            }
                        }}

                        src={`https://github.com/${mensagem.de}.png`}
                        
                    
                    
                    />
                    <Text tag="strong">
                        {mensagem.de}
                    </Text>
                    <Text
                        styleSheet={{
                            fontSize: '10px',
                            marginLeft: '8px',
                            color: appConfig.theme.colors.neutrals[999],
                        }}
                        tag="span"
                    >
                        {(new Date().toLocaleDateString())}
                    </Text>
                    <Text
                                onClick={handleDeletarMensagem}
                                styleSheet={{
                                    fontSize: '10px',
                                    fontWeight: 'bold',
                                    marginLeft: 'auto',
                                    color: '#FFF',
                                    backgroundColor: 'rgba(0,0,0,.5)',
                                    width: '20px',
                                    height: '20px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    backgroundImage: 'url(https://img1.gratispng.com/20180524/pqs/kisspng-red-card-yellow-card-referee-ejection-football-card-5b07697d1ce160.0352049615272124131183.jpg)',
                                    backgroundSize : 'cover',
                                    hover: {
                                        transform: 'scale(2.5)',
                                        marginLeft: '20px',
                                        marginRight: '20px',
                                        fontSize: '10px',
                                    fontWeight: 'bold',
                                    marginLeft: 'auto',
                                    color: '#FFF',
                                    backgroundColor: 'rgba(0,0,0,.5)',
                                    width: '20px',
                                    height: '20px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                     
                                    }
                                }}
                                tag="span"
                                data-id={mensagem.id}
                                
                            > x </Text>
                            
                </Box>
                {mensagem.texto.startsWith(`:Sticker:`)? 
                 (
                    <Image src = {mensagem.texto.replace(`:Sticker:`,'')} />
                ):

                    mensagem.texto
                }
                
            </Text>
                )
            })}
            
        </Box>
    )
}