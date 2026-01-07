import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type Team = {
  id: number;
  name: string;
  logo: string;
  wins: number;
  losses: number;
  rank: number;
  players: string[];
};

type Match = {
  id: number;
  team1: string;
  team2: string;
  score1: number | null;
  score2: number | null;
  date: string;
  status: 'upcoming' | 'live' | 'finished';
};

type Tournament = {
  id: number;
  name: string;
  status: 'active' | 'finished';
  prize: string;
  date: string;
};

const mockTeams: Team[] = [
  { id: 1, name: 'Natus Vincere', logo: '🦅', wins: 28, losses: 5, rank: 1, players: ['s1mple', 'electroNic', 'Perfecto', 'b1t', 'sdy'] },
  { id: 2, name: 'FaZe Clan', logo: '⚡', wins: 25, losses: 8, rank: 2, players: ['karrigan', 'rain', 'Twistzz', 'ropz', 'broky'] },
  { id: 3, name: 'Team Vitality', logo: '🐝', wins: 23, losses: 10, rank: 3, players: ['ZywOo', 'apEX', 'Magisk', 'Spinx', 'mezii'] },
  { id: 4, name: 'G2 Esports', logo: '🎯', wins: 20, losses: 12, rank: 4, players: ['NiKo', 'huNter', 'm0NESY', 'HooXi', 'jks'] },
  { id: 5, name: 'Cloud9', logo: '☁️', wins: 18, losses: 14, rank: 5, players: ['Ax1Le', 'HeavyGod', 'sh1ro', 'nafany', 'electroNic'] },
];

const mockMatches: Match[] = [
  { id: 1, team1: 'Natus Vincere', team2: 'FaZe Clan', score1: null, score2: null, date: '2026-01-10', status: 'upcoming' },
  { id: 2, team1: 'Team Vitality', team2: 'G2 Esports', score1: 16, score2: 13, date: '2026-01-07', status: 'live' },
  { id: 3, team1: 'Cloud9', team2: 'Natus Vincere', score1: 12, score2: 16, date: '2026-01-05', status: 'finished' },
  { id: 4, team1: 'FaZe Clan', team2: 'Team Vitality', score1: 16, score2: 14, date: '2026-01-04', status: 'finished' },
];

const mockTournaments: Tournament[] = [
  { id: 1, name: 'MLT Major 2026', status: 'active', prize: '$1,000,000', date: '2026-01-15 - 2026-01-30' },
  { id: 2, name: 'Winter Championship', status: 'active', prize: '$500,000', date: '2026-01-20 - 2026-02-05' },
  { id: 3, name: 'Fall Masters', status: 'finished', prize: '$750,000', date: '2025-11-01 - 2025-11-20' },
];

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-primary/30 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl md:text-4xl font-rajdhani font-bold neon-text">
              MLT | CS2 TOURNAMENT
            </h1>
            <nav className="hidden md:flex gap-4 lg:gap-6">
              {['home', 'teams', 'matches', 'tournaments', 'rating', 'rules'].map((tab) => (
                <Button
                  key={tab}
                  variant={activeTab === tab ? 'default' : 'ghost'}
                  onClick={() => setActiveTab(tab)}
                  className={`font-rajdhani text-base lg:text-lg uppercase ${
                    activeTab === tab ? 'neon-glow' : ''
                  }`}
                >
                  {tab === 'home' ? 'Главная' : 
                   tab === 'teams' ? 'Команды' :
                   tab === 'matches' ? 'Матчи' :
                   tab === 'tournaments' ? 'Турниры' :
                   tab === 'rating' ? 'Рейтинг' :
                   'Правила'}
                </Button>
              ))}
            </nav>
            <Button 
              variant="outline" 
              className="md:hidden neon-border" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Icon name={mobileMenuOpen ? 'X' : 'Menu'} size={24} />
            </Button>
          </div>
          {mobileMenuOpen && (
            <nav className="md:hidden mt-4 flex flex-col gap-2">
              {['home', 'teams', 'matches', 'tournaments', 'rating', 'rules'].map((tab) => (
                <Button
                  key={tab}
                  variant={activeTab === tab ? 'default' : 'ghost'}
                  onClick={() => {
                    setActiveTab(tab);
                    setMobileMenuOpen(false);
                  }}
                  className={`font-rajdhani text-lg uppercase justify-start ${
                    activeTab === tab ? 'neon-glow' : ''
                  }`}
                >
                  {tab === 'home' ? 'Главная' : 
                   tab === 'teams' ? 'Команды' :
                   tab === 'matches' ? 'Матчи' :
                   tab === 'tournaments' ? 'Турниры' :
                   tab === 'rating' ? 'Рейтинг' :
                   'Правила'}
                </Button>
              ))}
            </nav>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {activeTab === 'home' && (
          <div className="space-y-12">
            <section className="relative overflow-hidden rounded-lg border-2 border-primary p-6 md:p-12 neon-border bg-gradient-to-br from-card via-card to-secondary/20">
              <div className="relative z-10">
                <h2 className="text-3xl md:text-6xl font-rajdhani font-bold mb-4 neon-text">
                  КИБЕРСПОРТИВНАЯ АРЕНА
                </h2>
                <p className="text-lg md:text-2xl text-muted-foreground mb-6">
                  Следи за турнирами CS2 | Делай ставки | Побеждай
                </p>
                <Button size="lg" className="neon-glow font-rajdhani text-lg">
                  Присоединиться <Icon name="ArrowRight" className="ml-2" size={20} />
                </Button>
              </div>
              <div className="absolute top-0 right-0 w-48 md:w-64 h-48 md:h-64 bg-primary/20 rounded-full blur-3xl animate-pulse-glow"></div>
              <div className="absolute bottom-0 left-0 w-32 md:w-48 h-32 md:h-48 bg-secondary/20 rounded-full blur-3xl animate-pulse-glow"></div>
            </section>

            <section>
              <h3 className="text-2xl md:text-3xl font-rajdhani font-bold mb-6 flex items-center gap-3">
                <Icon name="Calendar" className="text-primary" size={28} />
                Предстоящие матчи
              </h3>
              <div className="grid gap-4">
                {mockMatches.filter(m => m.status === 'upcoming' || m.status === 'live').map((match) => (
                  <Card key={match.id} className="border-primary/30 hover:border-primary transition-all hover:neon-border bg-card/80 backdrop-blur">
                    <CardContent className="p-4 md:p-6">
                      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-4 md:gap-8 w-full md:w-auto">
                          <div className="text-center">
                            <div className="text-3xl md:text-4xl mb-2">{mockTeams.find(t => t.name === match.team1)?.logo}</div>
                            <p className="font-rajdhani font-semibold text-sm md:text-lg">{match.team1}</p>
                          </div>
                          <div className="text-center">
                            {match.status === 'live' ? (
                              <>
                                <Badge className="mb-2 bg-accent purple-glow animate-pulse-glow">
                                  <Icon name="Radio" size={12} className="mr-1" /> LIVE
                                </Badge>
                                <p className="text-2xl md:text-3xl font-bold font-rajdhani">
                                  {match.score1} : {match.score2}
                                </p>
                              </>
                            ) : (
                              <>
                                <p className="text-muted-foreground text-sm mb-2">VS</p>
                                <p className="text-lg md:text-xl font-rajdhani text-primary">{match.date}</p>
                              </>
                            )}
                          </div>
                          <div className="text-center">
                            <div className="text-3xl md:text-4xl mb-2">{mockTeams.find(t => t.name === match.team2)?.logo}</div>
                            <p className="font-rajdhani font-semibold text-sm md:text-lg">{match.team2}</p>
                          </div>
                        </div>
                        <Button className="neon-glow w-full md:w-auto">
                          Сделать ставку <Icon name="TrendingUp" className="ml-2" size={18} />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-2xl md:text-3xl font-rajdhani font-bold mb-6 flex items-center gap-3">
                <Icon name="Trophy" className="text-secondary" size={28} />
                Топ-3 команды
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockTeams.slice(0, 3).map((team, index) => (
                  <Card 
                    key={team.id} 
                    className={`border-2 transition-all hover:scale-105 cursor-pointer ${
                      index === 0 ? 'border-primary neon-glow' :
                      index === 1 ? 'border-secondary purple-glow' :
                      'border-accent pink-glow'
                    } bg-card/80 backdrop-blur`}
                    onClick={() => setSelectedTeam(team)}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="text-5xl md:text-6xl">{team.logo}</div>
                        <Badge className={`text-xl md:text-2xl font-bold px-3 md:px-4 py-1 md:py-2 ${
                          index === 0 ? 'bg-primary' :
                          index === 1 ? 'bg-secondary' :
                          'bg-accent'
                        }`}>
                          #{team.rank}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl md:text-2xl font-rajdhani mt-4">{team.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between text-base md:text-lg">
                        <span className="text-green-400 font-semibold">W: {team.wins}</span>
                        <span className="text-red-400 font-semibold">L: {team.losses}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-2xl md:text-3xl font-rajdhani font-bold mb-6 flex items-center gap-3">
                <Icon name="Newspaper" className="text-accent" size={28} />
                Последние новости
              </h3>
              <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
                {[
                  { title: 'MLT Major 2026 стартует через неделю', date: '07.01.2026', category: 'Турниры' },
                  { title: 'Natus Vincere обновляет состав', date: '06.01.2026', category: 'Команды' },
                  { title: 'Новые правила для турниров MLT', date: '05.01.2026', category: 'Правила' },
                  { title: 'Рекордные призовые в 2026 году', date: '04.01.2026', category: 'Новости' },
                ].map((news, index) => (
                  <Card key={index} className="border-primary/30 hover:border-primary transition-all bg-card/80 backdrop-blur cursor-pointer">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                        <Badge variant="outline" className="text-primary border-primary">
                          {news.category}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{news.date}</span>
                      </div>
                      <CardTitle className="text-lg md:text-xl font-rajdhani hover:text-primary transition-colors">
                        {news.title}
                      </CardTitle>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'teams' && (
          <div>
            <h2 className="text-3xl md:text-4xl font-rajdhani font-bold mb-8 neon-text">Команды</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockTeams.map((team) => (
                <Card 
                  key={team.id} 
                  className="border-primary/30 hover:border-primary transition-all cursor-pointer hover:neon-border bg-card/80 backdrop-blur"
                  onClick={() => setSelectedTeam(team)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="text-4xl md:text-5xl">{team.logo}</div>
                      <Badge className="text-lg md:text-xl font-bold px-2 md:px-3 py-1">#{team.rank}</Badge>
                    </div>
                    <CardTitle className="text-xl md:text-2xl font-rajdhani mt-4">{team.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between text-base md:text-lg mb-4">
                      <span className="text-green-400 font-semibold">Побед: {team.wins}</span>
                      <span className="text-red-400 font-semibold">Поражений: {team.losses}</span>
                    </div>
                    <Button className="w-full neon-glow">
                      Просмотр профиля <Icon name="ChevronRight" className="ml-2" size={18} />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'matches' && (
          <div>
            <h2 className="text-3xl md:text-4xl font-rajdhani font-bold mb-8 neon-text">Матчи</h2>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full md:w-[400px] grid-cols-3 mb-8">
                <TabsTrigger value="all">Все</TabsTrigger>
                <TabsTrigger value="live">Live</TabsTrigger>
                <TabsTrigger value="finished">Завершены</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="space-y-4">
                {mockMatches.map((match) => (
                  <Card key={match.id} className="border-primary/30 hover:border-primary transition-all bg-card/80 backdrop-blur">
                    <CardContent className="p-4 md:p-6">
                      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-4 md:gap-8 w-full md:w-auto">
                          <div className="text-center">
                            <div className="text-3xl md:text-4xl mb-2">{mockTeams.find(t => t.name === match.team1)?.logo}</div>
                            <p className="font-rajdhani font-semibold text-sm md:text-base">{match.team1}</p>
                          </div>
                          <div className="text-center">
                            <div className="mb-2">
                              {match.status === 'live' && (
                                <Badge className="bg-accent purple-glow animate-pulse-glow">
                                  <Icon name="Radio" size={12} className="mr-1" /> LIVE
                                </Badge>
                              )}
                              {match.status === 'upcoming' && (
                                <Badge variant="outline" className="border-primary text-primary">
                                  Предстоящий
                                </Badge>
                              )}
                              {match.status === 'finished' && (
                                <Badge variant="secondary">Завершен</Badge>
                              )}
                            </div>
                            {match.score1 !== null ? (
                              <p className="text-2xl md:text-3xl font-bold font-rajdhani">
                                {match.score1} : {match.score2}
                              </p>
                            ) : (
                              <p className="text-lg md:text-xl font-rajdhani text-primary">{match.date}</p>
                            )}
                          </div>
                          <div className="text-center">
                            <div className="text-3xl md:text-4xl mb-2">{mockTeams.find(t => t.name === match.team2)?.logo}</div>
                            <p className="font-rajdhani font-semibold text-sm md:text-base">{match.team2}</p>
                          </div>
                        </div>
                        {match.status !== 'finished' && (
                          <Button className="neon-glow w-full md:w-auto">
                            Сделать ставку
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>
        )}

        {activeTab === 'tournaments' && (
          <div>
            <h2 className="text-3xl md:text-4xl font-rajdhani font-bold mb-8 neon-text">Турниры</h2>
            <Tabs defaultValue="active" className="w-full">
              <TabsList className="grid w-full md:w-[300px] grid-cols-2 mb-8">
                <TabsTrigger value="active">Активные</TabsTrigger>
                <TabsTrigger value="finished">Завершенные</TabsTrigger>
              </TabsList>
              <TabsContent value="active" className="grid sm:grid-cols-2 gap-6">
                {mockTournaments.filter(t => t.status === 'active').map((tournament) => (
                  <Card key={tournament.id} className="border-primary/30 hover:border-primary transition-all hover:neon-border bg-card/80 backdrop-blur">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge className="bg-accent purple-glow animate-pulse-glow text-base md:text-lg px-2 md:px-3 py-1">
                          Активный
                        </Badge>
                        <Icon name="Trophy" className="text-secondary" size={28} />
                      </div>
                      <CardTitle className="text-xl md:text-2xl font-rajdhani">{tournament.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-2 text-base md:text-lg">
                        <Icon name="DollarSign" className="text-green-400" size={20} />
                        <span className="font-semibold text-green-400">{tournament.prize}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground text-sm md:text-base">
                        <Icon name="Calendar" size={20} />
                        <span>{tournament.date}</span>
                      </div>
                      <Button className="w-full neon-glow mt-4">
                        Подробнее <Icon name="ExternalLink" className="ml-2" size={18} />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
              <TabsContent value="finished" className="grid sm:grid-cols-2 gap-6">
                {mockTournaments.filter(t => t.status === 'finished').map((tournament) => (
                  <Card key={tournament.id} className="border-primary/30 bg-card/80 backdrop-blur">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary" className="text-base md:text-lg px-2 md:px-3 py-1">
                          Завершен
                        </Badge>
                        <Icon name="Trophy" className="text-muted-foreground" size={28} />
                      </div>
                      <CardTitle className="text-xl md:text-2xl font-rajdhani">{tournament.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-2 text-base md:text-lg">
                        <Icon name="DollarSign" className="text-green-400" size={20} />
                        <span className="font-semibold text-green-400">{tournament.prize}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground text-sm md:text-base">
                        <Icon name="Calendar" size={20} />
                        <span>{tournament.date}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>
        )}

        {activeTab === 'rating' && (
          <div>
            <h2 className="text-3xl md:text-4xl font-rajdhani font-bold mb-8 neon-text">MLT Рейтинг</h2>
            <Card className="border-primary/30 bg-card/80 backdrop-blur">
              <CardContent className="p-4 md:p-6">
                <div className="space-y-4">
                  {mockTeams.map((team, index) => (
                    <div 
                      key={team.id}
                      className={`flex items-center justify-between p-3 md:p-4 rounded-lg border transition-all cursor-pointer ${
                        index < 3 ? 'border-primary hover:neon-border' : 'border-muted hover:border-primary'
                      } bg-background/50 flex-wrap md:flex-nowrap gap-4`}
                      onClick={() => setSelectedTeam(team)}
                    >
                      <div className="flex items-center gap-3 md:gap-6">
                        <Badge className={`text-lg md:text-2xl font-bold px-3 md:px-4 py-1 md:py-2 ${
                          index === 0 ? 'bg-primary neon-glow' :
                          index === 1 ? 'bg-secondary purple-glow' :
                          index === 2 ? 'bg-accent pink-glow' :
                          'bg-muted'
                        }`}>
                          #{team.rank}
                        </Badge>
                        <div className="text-4xl md:text-5xl">{team.logo}</div>
                        <div>
                          <p className="text-lg md:text-2xl font-rajdhani font-bold">{team.name}</p>
                          <p className="text-sm md:text-base text-muted-foreground">Игроков: {team.players.length}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 md:gap-8">
                        <div className="text-center">
                          <p className="text-xl md:text-2xl font-bold text-green-400">{team.wins}</p>
                          <p className="text-xs md:text-sm text-muted-foreground">Побед</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xl md:text-2xl font-bold text-red-400">{team.losses}</p>
                          <p className="text-xs md:text-sm text-muted-foreground">Поражений</p>
                        </div>
                        <Icon name="ChevronRight" className="text-primary hidden md:block" size={24} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'rules' && (
          <div>
            <h2 className="text-3xl md:text-4xl font-rajdhani font-bold mb-8 neon-text">Правила турниров</h2>
            <div className="space-y-6">
              <Card className="border-primary/30 bg-card/80 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-xl md:text-2xl font-rajdhani flex items-center gap-3">
                    <Icon name="Shield" className="text-primary" size={28} />
                    Общие правила
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-base md:text-lg leading-relaxed">
                  <p>1. Все участники должны соблюдать честную игру и спортивное поведение.</p>
                  <p>2. Использование читов и эксплойтов строго запрещено и ведет к дисквалификации.</p>
                  <p>3. Команды должны явиться на матч не позднее чем за 10 минут до начала.</p>
                  <p>4. Опоздание более 15 минут ведет к техническому поражению.</p>
                  <p>5. Все споры разрешаются администрацией турнира.</p>
                </CardContent>
              </Card>

              <Card className="border-secondary/30 bg-card/80 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-xl md:text-2xl font-rajdhani flex items-center gap-3">
                    <Icon name="Users" className="text-secondary" size={28} />
                    Правила для команд
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-base md:text-lg leading-relaxed">
                  <p>1. Команда должна состоять из 5 основных игроков и до 2 запасных.</p>
                  <p>2. Замены разрешены только между матчами.</p>
                  <p>3. Капитан команды несет ответственность за действия всех игроков.</p>
                  <p>4. Регистрация команды закрывается за 48 часов до начала турнира.</p>
                </CardContent>
              </Card>

              <Card className="border-accent/30 bg-card/80 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-xl md:text-2xl font-rajdhani flex items-center gap-3">
                    <Icon name="TrendingUp" className="text-accent" size={28} />
                    Правила ставок
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-base md:text-lg leading-relaxed">
                  <p>1. Ставки принимаются до начала матча.</p>
                  <p>2. Минимальная ставка: 100 MLT токенов.</p>
                  <p>3. Игроки и команды не могут делать ставки на собственные матчи.</p>
                  <p>4. В случае технической проблемы ставки возвращаются.</p>
                  <p>5. Выплаты производятся в течение 24 часов после завершения матча.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>

      {selectedTeam && (
        <div 
          className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setSelectedTeam(null)}
        >
          <Card 
            className="max-w-4xl w-full border-primary neon-border bg-card animate-slide-in my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <CardHeader>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4 md:gap-6">
                  <div className="text-5xl md:text-7xl">{selectedTeam.logo}</div>
                  <div>
                    <CardTitle className="text-2xl md:text-4xl font-rajdhani">{selectedTeam.name}</CardTitle>
                    <p className="text-lg md:text-xl text-muted-foreground mt-2">Рейтинг: #{selectedTeam.rank}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setSelectedTeam(null)}>
                  <Icon name="X" size={24} />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-green-500/10 border-green-500/30">
                  <CardContent className="p-4 text-center">
                    <p className="text-3xl md:text-4xl font-bold text-green-400 font-rajdhani">{selectedTeam.wins}</p>
                    <p className="text-sm md:text-base text-muted-foreground">Побед</p>
                  </CardContent>
                </Card>
                <Card className="bg-red-500/10 border-red-500/30">
                  <CardContent className="p-4 text-center">
                    <p className="text-3xl md:text-4xl font-bold text-red-400 font-rajdhani">{selectedTeam.losses}</p>
                    <p className="text-sm md:text-base text-muted-foreground">Поражений</p>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h4 className="text-xl md:text-2xl font-rajdhani font-bold mb-4 flex items-center gap-2">
                  <Icon name="Users" className="text-primary" size={24} />
                  Состав команды
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {selectedTeam.players.map((player, index) => (
                    <Card key={index} className="border-primary/30 bg-background/50">
                      <CardContent className="p-3 md:p-4 text-center">
                        <div className="text-2xl md:text-3xl mb-2">👤</div>
                        <p className="font-rajdhani font-semibold text-sm md:text-lg">{player}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xl md:text-2xl font-rajdhani font-bold mb-4 flex items-center gap-2">
                  <Icon name="History" className="text-secondary" size={24} />
                  Недавние матчи
                </h4>
                <div className="space-y-2">
                  {mockMatches
                    .filter(m => m.team1 === selectedTeam.name || m.team2 === selectedTeam.name)
                    .slice(0, 3)
                    .map((match) => (
                      <div key={match.id} className="flex items-center justify-between p-3 border border-primary/30 rounded-lg bg-background/50 flex-wrap gap-2">
                        <span className="font-rajdhani text-sm md:text-base">{match.team1} vs {match.team2}</span>
                        {match.score1 !== null ? (
                          <Badge variant={
                            (match.team1 === selectedTeam.name && match.score1! > match.score2!) ||
                            (match.team2 === selectedTeam.name && match.score2! > match.score1!)
                              ? 'default' : 'destructive'
                          }>
                            {match.score1} : {match.score2}
                          </Badge>
                        ) : (
                          <Badge variant="outline">{match.date}</Badge>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <footer className="border-t border-primary/30 bg-card/50 backdrop-blur-sm mt-16 py-8">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-xl md:text-2xl font-rajdhani font-bold mb-2 neon-text">MLT | CS2 TOURNAMENT</h3>
          <p className="text-sm md:text-base text-muted-foreground">© 2026 Все права защищены</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;