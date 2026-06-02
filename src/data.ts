import { ServiceItem } from './types';

export const servicesData: ServiceItem[] = [
  {
    id: 'instalacao',
    name: 'Instalação de Ar Condicionado',
    tagline: 'Instalação profissional de sistemas de ar condicionado.',
    description: 'Oferecemos serviço profissional de instalação de sistemas de ar condicionado para garantir que seu equipamento funcione de forma eficiente, silenciosa e segura, seguindo rigorosamente as diretrizes dos fabricantes para preservar sua garantia.',
    price: 690,
    basePriceText: 'A partir de R$ 690',
    image: 'https://static.wixstatic.com/media/d2d94fbccb164613a4e94e6043510ae8.jpg',
    duration: '2h - 3h',
    features: [
      'Cálculo de carga térmica exato',
      'Passagem de tubulação em cobre de alta qualidade',
      'Furação com serra copo (evita rachaduras)',
      'Vácuo na tubulação para remover umidade',
      'Teste rigoroso de estanqueidade contra vazamentos',
      'Instruções completas de uso do controle remoto'
    ]
  },
  {
    id: 'limpeza',
    name: 'Limpeza & Higienização Completa',
    tagline: 'Limpeza para ar puro e equipamento eficaz.',
    description: 'Serviço especializado de limpeza química e higienização interna de componentes para melhorar a qualidade do ar, eliminar odores, fungos e bactérias, além de prolongar consideravelmente a vida útil da sua climatização.',
    price: 250,
    basePriceText: 'Preço fixo de R$ 250',
    image: 'https://static.wixstatic.com/media/11062b_7269e6182e79481faebfa7ee1190db28~mv2.jpg',
    duration: '1h - 1h30',
    features: [
      'Remoção e lavagem química da carenagem externa',
      'Aplicação de bactericida biodegradável registrado',
      'Higienização profunda da turbina (elimina ruídos)',
      'Desobstrução do dreno para evitar gotejamentos',
      'Limpeza completa da serpentina da evaporadora',
      'Filtros lavados e esterilizados'
    ]
  },
  {
    id: 'manutencao',
    name: 'Manutenção Preventiva & Corretiva',
    tagline: 'Manutenção regular para desempenho ideal.',
    description: 'Serviço preventivo detalhado para garantir o perfeito funcionamento mecânico e elétrico da sua climatização, reduzindo riscos de paradas inesperadas e melhorando o consumo de energia elétrica em até 30%.',
    price: 400,
    basePriceText: 'A partir de R$ 400',
    image: 'https://static.wixstatic.com/media/11062b_4f397e3801194fbcad0fb8eda9342cdb~mv2.jpg',
    duration: '1h30 - 2h',
    features: [
      'Medição de pressão do gás refrigerante',
      'Aperto de conexões elétricas e bornes',
      'Avaliação do rendimento do compressor',
      'Teste de sensores de temperatura e placas',
      'Lubrificação dos motores ventiladores',
      'Identificação preventiva de desgastes em capacitores'
    ]
  }
];

export const valuesData = [
  {
    title: 'Garantia de Qualidade',
    description: 'Nossos técnicos seguem padrões rigorosos e oferecemos garantia completa em todos os serviços executados.',
    icon: 'ShieldCheck'
  },
  {
    title: 'Pontualidade Britânica',
    description: 'Respeitamos seu tempo. Agendamos com horário marcado e cumprimos rigorosamente o compromisso.',
    icon: 'Clock'
  },
  {
    title: 'Técnicos Certificados',
    description: 'Nossa equipe passa por treinamentos periódicos direto com as principais marcas do mercado.',
    icon: 'Award'
  },
  {
    title: 'Atendimento Limpo e Seguro',
    description: 'Trabalhamos de forma organizada. Usamos capas coletoras de sujeira e deixamos seu ambiente impecável.',
    icon: 'Sparkles'
  }
];

export const faqsData = [
  {
    question: 'Como funciona a calculadora de BTUs?',
    answer: 'Nossa calculadora cruza o tamanho do ambiente (m²) com a exposição solar e o número de pessoas/aparelhos elétricos para dar a potência exata ideal. Um aparelho com potência inferior consumirá muito mais energia tentando refrigerar o local.'
  },
  {
    question: 'Com que frequência devo realizar a limpeza do meu ar condicionado?',
    answer: 'Para ambientes residenciais normais, recomendamos a higienização profissional a cada 6 meses. Em escritórios, clínicas ou comércios com fluxo constante, o ideal é realizar a trimestralmente para manter as vias respiratórias protegidas.'
  },
  {
    question: 'Vocês dão garantia nos serviços de instalação?',
    answer: 'Com certeza! Oferecemos 1 ano de garantia na mão de obra da instalação quando realizada conforme as recomendações do fabricante, o que protege seu investimento contra vazamentos ou quaisquer falhas técnicas.'
  },
  {
    question: 'O que é a manutenção preventiva com medição de gás?',
    answer: 'Nela medimos a pressão do gás refrigerante no compressor. Se houver falta de gás por conta de alguma microfissura, o rendimento cai e o consumo elétrico dispara. O ajuste preventivo evita que o compressor queime, o que geraria um custo muito maior.'
  },
  {
    question: 'Vocês atendem quais regiões?',
    answer: 'Atendemos todo o Vale do Itajaí e Litoral Catarinense. Entre em contato para confirmar a disponibilidade para a sua cidade ou bairro.'
  }
];
