import { SVGS } from "./constants";
import {
  Brain,
  Target,
  Users,
  Trophy,
  Gamepad2,
  MessageSquare,
  Mic,
  Eye,
  Code,
  Database,
  Server,
  Globe,
  Smartphone,
  Shield,
  Zap,
  Palette,
  PenTool,
  Camera,
  Video,
  Music,
  BookOpen,
  GraduationCap,
  Briefcase,
  TrendingUp,
  BarChart,
  PieChart,
  Settings,
  Wrench,
  Hammer,
  Cpu,
  HardDrive,
  Wifi,
  Cloud,
  Lock,
  Key,
  Search,
  FileCode,
  Terminal,
  GitBranch,
  Package,
  Layers,
  Layout,
  Figma,
  Lightbulb,
  Rocket,
  Star,
  Heart,
  Swords,
  Crown,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  brain: Brain,
  target: Target,
  users: Users,
  trophy: Trophy,
  gamepad: Gamepad2,
  message: MessageSquare,
  mic: Mic,
  eye: Eye,
  code: Code,
  database: Database,
  server: Server,
  globe: Globe,
  smartphone: Smartphone,
  shield: Shield,
  zap: Zap,
  palette: Palette,
  pen: PenTool,
  camera: Camera,
  video: Video,
  music: Music,
  book: BookOpen,
  graduation: GraduationCap,
  briefcase: Briefcase,
  trending: TrendingUp,
  "bar-chart": BarChart,
  "pie-chart": PieChart,
  settings: Settings,
  wrench: Wrench,
  hammer: Hammer,
  cpu: Cpu,
  "hard-drive": HardDrive,
  wifi: Wifi,
  cloud: Cloud,
  lock: Lock,
  key: Key,
  search: Search,
  "file-code": FileCode,
  terminal: Terminal,
  git: GitBranch,
  package: Package,
  layers: Layers,
  layout: Layout,
  figma: Figma,
  lightbulb: Lightbulb,
  rocket: Rocket,
  star: Star,
  heart: Heart,
  swords: Swords,
  crown: Crown,
};

type IconProps = { className?: string; style?: React.CSSProperties };
type IconComponent = React.ComponentType<IconProps>;

function createSvgComponent(svg: string): IconComponent {
  return function SvgIcon({ className, style }: IconProps) {
    return <span className={className} style={style} dangerouslySetInnerHTML={{ __html: svg }} />;
  };
}

export function getSkillIcon(name: string): IconComponent | null {
  const key = name.toLowerCase();
  
 
  if (key in SVGS) {
    return createSvgComponent(SVGS[key as keyof typeof SVGS]);
  }
  

  return iconMap[key] || null;
}

export { iconMap };
