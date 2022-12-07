

import os

class CronManager:
    def __init__(self) -> None:
        self.cron_file = '/var/spool/cron/crontabs/root'
        self.time_regex = '([0-9].*\ |\*\ ){5}'
        self.cleaner_command = f'sh /app/disk_cleaner.sh \| xargs >> /var/log/cron.log'
        self.restart_cron_service()
        
    
    def update_cleaner_time(self, new_time=None):
        cp_command  = f'cp {self.cron_file} tmp.txt'
        sed_command = f'sed -i -E "s:^{self.time_regex}.*{self.cleaner_command}$:{new_time} {self.cleaner_command}:" tmp.txt'
        cat_command = f'cat tmp.txt > {self.cron_file}'  
        os.popen(cp_command)
        os.popen(sed_command)
        os.popen(cat_command)
        self.restart_cron_service()
        return sed_command
    
    def restart_cron_service(self):
        restart_command = 'crond restart'
        os.popen(restart_command)
    