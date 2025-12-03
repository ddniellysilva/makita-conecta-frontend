import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button"; 
import { Card, CardContent } from "@/components/ui/card";
import MakitaLogo from "@/assets/makita-conecta-logo.svg";

// --- Interface para Tipagem de Dados ---
interface Animal {
  id: number;
  name: string;
  species: 'Cachorro' | 'Gato' | 'Outro';
  breed: string;
  status: 'Disponível' | 'Adotado' | 'Em Avaliação';
  age: string;
  size: 'Pequeno' | 'Médio' | 'Grande';
  sex: 'Macho' | 'Fêmea';
  location: string;
  description: string;
  temperament: string[];
  vaccines: { name: string; status: 'Em dia' | 'Pendente' }[];
  specialCare: string[];
  mainImage: string;
  thumbnailImages: string[];
}

// --- Dados Mockados (Simulação de Retorno da API) ---
const MOCK_ANIMAL: Animal = {
  id: 1,
  name: "Luna",
  species: 'Cachorro',
  breed: 'Labrador Retriever',
  status: 'Disponível',
  age: '2 anos',
  size: 'Grande',
  sex: 'Fêmea',
  location: 'São Paulo, SP',
  description: "Luna é meiga e se adapta rapidamente a uma nova rotina. Após a dor de perder seu tutor, ela é uma cachorra muito carinhosa e cheia de vida. Sociável com outros animais e crianças, Luna é a companhia perfeita para famílias ativas que possam oferecer o amor e os cuidados que ela merece. Ela adora buscar a bolinha e longas caminhadas no parque.",
  temperament: ['Brincalhão', 'Sociável', 'Obediente', 'Energética'],
  vaccines: [
    { name: 'V10', status: 'Em dia' },
    { name: 'Antirrábica', status: 'Em dia' },
    { name: 'Vermífugo', status: 'Em dia' },
  ],
  specialCare: [
    'Necessita de exercícios diários',
    'Ideal para morar com quintal',
    'Recomendado para tutores experientes',
  ],
  // Imagens Placeholder (Substitua por URLs reais)
  mainImage: "https://placehold.co/800x600/D2B48C/5C4033?text=Luna+Principal",
  thumbnailImages: [
    "https://placehold.co/150x150/D2B48C/5C4033?text=Foto+1",
    "https://placehold.co/150x150/D2B48C/5C4033?text=Foto+2",
    "https://placehold.co/150x150/D2B48C/5C4033?text=Foto+3",
  ],
};

// --- Interfaces de Propriedades do Componente ---
interface AnimalProfileProps extends React.ComponentProps<"div"> {
    animalId?: number; 
}


// --- Componente Auxiliar: Card de Informações (Simula um componente UI) ---
const InfoCard: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex flex-col p-3 bg-secondary rounded-lg">
    <span className="text-xs font-semibold text-muted-foreground uppercase">{label}</span>
    <span className="text-base font-bold text-foreground">{value}</span>
  </div>
);

// --- Componente Auxiliar: Tag de Vacina ---
const VaccineTag: React.FC<{ name: string; status: 'Em dia' | 'Pendente' }> = ({ name, status }) => {
  const isUpToDate = status === 'Em dia';
  const successColor = "text-green-600";
  const warningColor = "text-amber-500"; 

  const icon = isUpToDate ? (
    <svg className={`w-4 h-4 ${successColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
    </svg>
  ) : (
    <svg className={`w-4 h-4 ${warningColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
  );

  return (
    <div className="flex justify-between items-center p-2 bg-card rounded-lg shadow-sm mb-1 border border-border">
      <span className="text-foreground/80 font-medium text-sm">{name}</span>
      <div className={`flex items-center space-x-1 ${isUpToDate ? successColor : warningColor}`}>
        {icon}
        <span className="text-xs font-semibold">{status}</span>
      </div>
    </div>
  );
};

// --- Componente Principal da Tela de Perfil (Export Function Style) ---
export function AnimalProfile({ animalId = 1, className, ...props }: AnimalProfileProps) {
  // Estado
  const [animal, setAnimal] = useState<Animal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Hook para buscar os dados
  useEffect(() => {
    const fetchAnimalData = async (id: number) => {
      if (!id || id <= 0) {
        setLoading(false);
        setError('ID do animal inválido.');
        return;
      }
      setLoading(true);
      setError(null);
      setAnimal(null);

      await new Promise(resolve => setTimeout(resolve, 1500)); 

      try {
        if (id === 1) {
            setAnimal(MOCK_ANIMAL);
        } else {
            setError(`O animal com ID ${id} não foi encontrado.`);
            setAnimal(null);
        }
      } catch (err) {
        setError('Não foi possível carregar o perfil do animal. Tente novamente mais tarde.');
        console.error("Erro ao buscar animal:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimalData(animalId);
  }, [animalId]); 

  
  // --- Renderização Condicional: Loading / Erro / Não Encontrado (Mantida) ---
  if (loading) {
    return (
        <div className={cn("min-h-screen bg-background flex items-center justify-center", className)} {...props}>
            <div className="text-primary flex flex-col items-center">
                <div className="w-10 h-10 border-4 border-t-4 border-primary border-t-transparent rounded-full animate-spin mb-3"></div>
                <p className="text-lg text-foreground">Carregando perfil do animal...</p>
            </div>
        </div>
    );
  }

  if (error || !animal) {
    const message = error || `O animal com ID ${animalId} não foi encontrado.`;
    const title = error ? "Erro ao carregar!" : "Animal não encontrado :(";
    
    return (
        <div className={cn("min-h-screen bg-background flex items-center justify-center", className)} {...props}>
            <div className="text-foreground flex flex-col items-center p-6 bg-card rounded-xl shadow-lg border border-border max-w-sm">
                <h2 className="text-xl font-bold mb-2">{title}</h2>
                <p className="text-sm text-muted-foreground mb-4 text-center">{message}</p>
                <Button 
                    onClick={() => error ? window.location.reload() : console.log('Navegar para a lista de animais')} 
                    className="mt-4 bg-accent text-accent-foreground"
                >
                    {error ? 'Tentar Novamente' : 'Ver todos os animais'}
                </Button>
            </div>
        </div>
    );
  }

  // --- Renderização Principal (Dados Carregados) ---
  // A cor #2d1b12 é o token --ink. Usaremos `style` inline para garantir a aplicação da cor exata
  const darkInkColor = '#2d1b12';
  
  return (
    <div className={cn("min-h-screen w-full bg-background", className)} {...props}>
      {/* 1. Header Fixo com Logo e Botão Voltar */}
      <header className="sticky top-0 z-10 p-4 shadow-md" style={{ backgroundColor: darkInkColor }}>
        {/* O header ocupa 100% da largura, com padding horizontal */}
        <div className="flex justify-between items-center px-4 md:px-8 lg:px-12">
          {/* Logo Makita Conecta (usando a URL hardcoded) */}
          <img
            src={MakitaLogo} // Usando a URL string
            alt="Logo Makita Conecta"
            className="w-auto h-8"
            // Fallback caso a imagem não carregue (agora com texto em MAIÚSCULAS)
            onError={(e) => { e.currentTarget.src = 'https://placehold.co/100x32/6f4e37/f8f3ec?text=MAKITA'; e.currentTarget.className = "w-auto h-8 text-white"; }}
          />

          {/* Usando o componente Button */}
          <Button
            className="hidden sm:block text-primary bg-primary-foreground font-semibold rounded-full shadow-lg text-sm px-4 py-2"
            variant="secondary" 
            onClick={() => console.log('Voltar')}
          >
            Voltar
          </Button>
        </div>
      </header>

      {/* Main Content Area - Ocupa toda a largura, padding horizontal garante o espaçamento nas bordas */}
      <main className="w-full p-4 md:p-8">
        
        {/* Container principal para o conteúdo central (Limitado para melhor leitura no desktop) */}
        <div className="mx-auto max-w-7xl">
            
            {/* Layout Principal: Imagens e Detalhes */}
            {/* O layout agora é 2/3 (imagens/temperamento) e 1/3 (detalhes/história/vacinas/cuidados) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
              
              {/* Coluna da Esquerda (Mobile: 100%, Desktop: 2/3) - Imagens e Galeria */}
              <section className="lg:col-span-2 space-y-6">
                <Card className="rounded-xl shadow-lg p-3 md:p-5">
                  <CardContent className='p-0'>
                    
                    {/* Imagem Principal */}
                    <div className="relative mb-3 overflow-hidden rounded-lg aspect-w-4 aspect-h-3">
                      <img
                        src={animal.mainImage}
                        alt={`Foto principal de ${animal.name}`}
                        className="w-full h-full object-cover rounded-lg"
                        onError={(e) => { e.currentTarget.src = `https://placehold.co/800x600/D2B48C/5C4033?text=Imagem+de+${animal.name}`; }}
                      />
                      {/* Ícone de favorito/like (coração) */}
                      <button className="absolute top-3 right-3 p-2 bg-card/70 backdrop-blur-sm rounded-full text-destructive hover:bg-card transition duration-300">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                      </button>
                    </div>

                    {/* Galeria de Thumbnails */}
                    <div className="flex space-x-3 overflow-x-auto pb-1">
                      {animal.thumbnailImages.map((img, index) => (
                        <img
                          key={index}
                          src={img}
                          alt={`Miniatura ${index + 1}`}
                          className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-md border-2 border-transparent hover:border-primary transition duration-300 cursor-pointer flex-shrink-0"
                          onError={(e) => { e.currentTarget.src = 'https://placehold.co/100x100/A0522D/FDF5E6?text=Thumb'; }}
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Temperamento: Manteve-se na seção 2/3 para preencher o espaço de forma harmoniosa */}
                <Card className="p-5 rounded-xl shadow-lg border border-border">
                  <CardContent className='p-0'>
                    <h2 className="text-xl font-bold text-foreground/80 mb-3 border-b pb-2 border-border">Temperamento</h2>
                    <div className="flex flex-wrap gap-2">
                      {animal.temperament.map((temp, index) => (
                        <span
                          key={index}
                          className="bg-secondary text-foreground font-medium px-3 py-1 rounded-full text-xs shadow-sm"
                        >
                          {temp}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Coluna da Direita (Mobile: 100%, Desktop: 1/3) - Detalhes, História, Vacinas e Cuidados */}
              <section className="lg:col-span-1 space-y-4 md:space-y-6">
                
                {/* Nome e Status */}
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground">{animal.name}</h1>
                    <p className="text-sm text-muted-foreground">{animal.breed} • {animal.species}</p>
                  </div>
                  <span className="text-xs font-bold py-1 px-3 rounded-full bg-green-100 text-green-700 uppercase self-center shadow-sm flex-shrink-0">
                    {animal.status}
                  </span>
                </div>

                {/* Cards de Detalhes (Reajustado para ser um Card único) */}
                <Card className="p-4 rounded-xl shadow-lg border border-border">
                  <CardContent className='p-0 grid grid-cols-2 gap-3'>
                    <InfoCard label="Idade" value={animal.age} />
                    <InfoCard label="Porte" value={animal.size} />
                    <InfoCard label="Sexo" value={animal.sex} />
                    <InfoCard label="Local" value={animal.location} />
                  </CardContent>
                </Card>

                {/* CTA Principal (Full width) - Cor alterada para Dark Ink */}
                <Button
                  onClick={() => console.log(`Interesse em visitar animal ID: ${animal.id}`)}
                  className="w-full font-bold py-3 text-lg shadow-lg text-primary-foreground"
                  style={{ backgroundColor: darkInkColor }}
                  variant="default"
                >
                  Tenho interesse em visitar
                </Button>

                {/* História/Descrição: MOVIDA para esta coluna, logo abaixo do CTA */}
                <Card className="p-5 rounded-xl shadow-lg border border-border">
                  <CardContent className='p-0'>
                    <h2 className="text-xl font-bold text-foreground/80 mb-3 border-b pb-2 border-border">História</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">{animal.description}</p>
                  </CardContent>
                </Card>

                {/* Vacinas */}
                <Card className="p-5 rounded-xl shadow-lg border border-border">
                  <CardContent className='p-0'>
                    <h2 className="text-xl font-bold text-foreground/80 mb-3 border-b pb-2 border-border">Vacinas</h2>
                    <div className="space-y-2">
                      {animal.vaccines.map((v, index) => (
                        <VaccineTag key={index} name={v.name} status={v.status} />
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Cuidados Especiais */}
                <Card className="p-5 rounded-xl shadow-lg border border-border">
                  <CardContent className='p-0'>
                    <h2 className="text-xl font-bold text-foreground/80 mb-3 border-b pb-2 border-border">Cuidados Especiais</h2>
                    <ul className="space-y-2 text-muted-foreground">
                      {animal.specialCare.map((care, index) => (
                        <li key={index} className="flex items-start text-sm">
                          {/* Usando 'accent' para o ícone de aviso */}
                          <svg className="w-4 h-4 text-accent mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm-1 11a1 1 0 112 0 1 1 0 01-2 0zm1-8a1 1 0 011 1v4a1 1 0 11-2 0V6a1 1 0 011-1z" clipRule="evenodd" fillRule="evenodd"></path>
                          </svg>
                          <span>{care}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </section>
            </div>

            {/* 3. Footer CTA - Chamada Final - Cor alterada para Dark Ink */}
            <section className="mt-8 md:mt-12">
              <Card className="rounded-xl shadow-xl p-6 md:p-8 text-center text-primary-foreground" style={{ backgroundColor: darkInkColor }}>
                <CardContent className='p-0'>
                  <h2 className="text-2xl md:text-3xl font-extrabold mb-2">
                    Pronto para dar um lar para {animal.name}?
                  </h2>
                  <p className="text-base mb-4 opacity-90">
                    Você sentirá em seu coração a alegria de mudar a vida de um animal.
                  </p>
                  <Button
                    onClick={() => console.log(`Adotar Agora animal ID: ${animal.id}`)}
                    className="bg-accent text-accent-foreground font-bold text-lg py-3 px-6 rounded-full shadow-lg hover:bg-accent/90 transition duration-300 transform hover:scale-105"
                  >
                    Adotar Agora
                  </Button>
                </CardContent>
              </Card>
            </section>
        </div>

      </main>
      
      {/* 4. Novo Footer Institucional - Cor alterada para Dark Ink */}
      <footer className="w-full py-6 mt-12 text-primary-foreground" style={{ backgroundColor: darkInkColor }}>
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} Makita Conecta. Todos os direitos reservados.</p>
            <p className="mt-1 text-xs opacity-70">Conectando corações a novos lares com responsabilidade e transparência.</p>
        </div>
      </footer>

    </div>
  );
}

// Exportação Padrão
export default AnimalProfile;