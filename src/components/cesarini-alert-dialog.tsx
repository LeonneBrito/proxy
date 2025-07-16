import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

interface CesariniAlertDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CesariniAlertDialog({
  open,
  onOpenChange,
}: CesariniAlertDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-gray-950 border border-green-800 text-green-400 rounded-none">
        <AlertDialogHeader>
          <AlertDialogTitle>⚠️ Atenção, Cesarini</AlertDialogTitle>
          <AlertDialogDescription className="text-green-400">
            Suas últimas ações quase comprometeram a integridade dos nossos
            mascotes. Persistindo, medidas serão tomadas. Esta é a única
            advertência que receberão.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-transparent border border-green-800 text-green-400 hover:bg-green-800 hover:text-black transition-colors">
            Entendido
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
